

export interface Entry {
    _id: string,
    description: string,
    createdAt: number,
    status: string
}


export type EntryStatus = 'pending' | 'in-progress' | 'finished'