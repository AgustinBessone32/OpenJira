import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesApi';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';


export interface EntriesState {
    entries: Entry[];
}


const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}



export const EntriesProvider: FC = ({ children }) => {

    const {enqueueSnackbar} = useSnackbar()

    const router = useRouter()

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async(description: string) => {

        const {data} = await entriesApi.post<Entry>('/entries',{description})

        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }

    const updateEntry = async (entry: Entry,showSnackbar = false) => {

        try {
            const {data} = await entriesApi.put<Entry>(`/entries/${entry._id}`, {description: entry.description, status: entry.status})

            dispatch({ type: '[Entry] - Entry-Updated', payload: data })
            
            enqueueSnackbar('Entrada actualizada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

            router.push('/')

            
        } catch (error) {
            
        }
    }


    const deleteEntry = async(entry: Entry) => {

        const {_id} = entry

        try {
            await entriesApi.delete<Entry>(`/entries/${_id}`)
            dispatch({ type:'[Entry] - Delete-Entry', payload: entry })

            enqueueSnackbar('Entrada eliminada', {
                variant: 'info',
                autoHideDuration: 1500,
                anchorOrigin:{
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

            router.push('/')
            
        } catch (error) {
            
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - Refresh-Data', payload: data })

    }

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};