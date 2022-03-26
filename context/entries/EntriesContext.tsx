import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
    entries: Entry[];

    //Metodos

    addNewEntry: (description:string) => void
    updateEntry: (entry:Entry, showSnackbar?: boolean) => void
    deleteEntry: (entry:Entry) => void
}


export const EntriesContext = createContext({} as ContextProps );