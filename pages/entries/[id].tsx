import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import React, { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Layout } from '../../components/layouts'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntryStatus, Entry } from '../../interfaces';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { dateFunctions } from '../../utils';


interface Entradas {
    text: string,
    value: string
}

interface Props {
    entry : Entry
}

const validStatus: Entradas[] = [
    {
        text: 'Pendiente',
        value:'pending'
    },
    {
        text: 'En Progreso',
        value:'in-progress'
    },
    {
        text: 'Finalizada',
        value:'finished'
    }            
]

export const EntryPage:FC<Props> = ({entry}) => {

    const { updateEntry, deleteEntry} = useContext(EntriesContext)

    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)
    const [inputValue, setInputValue] = useState(entry.description)

    const isNotValid = useMemo(() =>inputValue.length <= 0 && touched, [inputValue,touched])
    

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setStatus(event.target.value as EntryStatus)
    }

    const onSave = () => {
        if(inputValue.trim().length === 0) return

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        
        updateEntry(updatedEntry, true)
    }


    const deleted = (entry:Entry) => {
        deleteEntry(entry)
    }

  return (
    <Layout title={inputValue.substring(0,20) + '...'}>
        <Grid
            container
            justifyContent='center'
            sx={{marginTop: 2}}
        >

            <Grid item xs={12} sm={8} ms={6}>
                <Card>
                    <CardHeader
                        title={`Entrada:`}
                        subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                    />

                    <CardContent>
                        <TextField
                            sx={{marginTop: 2, marginBottom: 1}}
                            multiline
                            autoFocus
                            placeholder='Nueva entrada'
                            label='Nueva entrada'
                            fullWidth
                            value = {inputValue}
                            onChange={onTextChange}
                            helperText={isNotValid && 'Ingrese un valor'}
                            onBlur={() => setTouched(true)}
                            error={isNotValid}
                        />

                        <FormControl>
                            <FormLabel>
                                Estado:
                            </FormLabel>

                            <RadioGroup
                                row
                                value ={status}
                                onChange= {onStatusChange}
                            >
                                {
                                    validStatus.map(option =>(
                                        <FormControlLabel
                                            key={option.text}
                                            value={option.value}
                                            control={<Radio/>}
                                            label={option.text}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={<SaveOutlinedIcon/>}
                            variant='contained'
                            fullWidth
                            onClick={onSave}
                            disabled={inputValue.length <= 0 }
                        >
                            Guardar
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </Grid>

        <IconButton
            sx={{ position: 'absolute',bottom: 30, right:30, backgroundColor: 'error.dark' }}
            onClick={() => deleted(entry)}
        >
            <DeleteOutlineOutlinedIcon />

        </IconButton>

    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {id} = params as {id:string}

    const entry = await dbEntries.getEntryById(id)

    if(!entry) {
        return{
            redirect:{
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry        
        }
    }
}

export default EntryPage