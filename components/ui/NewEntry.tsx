import { Button, Box, TextField } from '@mui/material'
import React, { ChangeEvent, useState , useContext} from 'react'
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui/UIContext';


export const NewEntry = () => {

    const {addNewEntry} = useContext(EntriesContext)
    const {isAdding, setIsAddingEntry} = useContext(UIContext)

    const [inputValue, setInputValue] = useState('')
    const [isTauched, setIsTauched] = useState(false)

    const onTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if(inputValue.length === 0) return
        
        addNewEntry(inputValue)
        setIsAddingEntry(false)
        setIsTauched(false)
        setInputValue('')
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>

            {
                isAdding ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            label='Nueva entrada'
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            helperText={inputValue.length <= 0 && isTauched &&'Ingrese un valor'}
                            error={inputValue.length <= 0 && isTauched}
                            value ={inputValue}
                            onChange={onTextChange}
                            onBlur={() => setIsTauched(true)}
                        />

                        <Box display='flex' justifyContent='space-between'>

                            <Button variant='text' onClick={() => setIsAddingEntry(false)}>
                                Cancelar
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlinedIcon />}
                                onClick= {onSave}
                            >
                                Guardar
                            </Button>
                        </Box>

                    </>
                )

                    : (

                        <Button
                            startIcon={<LibraryAddOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAddingEntry(true)}
                        >
                            Agregar Tarea
                        </Button>

                    )
            }





        </Box>
    )
}
