import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { Entry } from '../../../../models'
import { IEntry } from '../../../../models/Entry'

type Data =
    | { message: string }
    | IEntry



export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query

    // if (!mongoose.isValidObjectId(id)) {
    //     res.status(400).json({
    //         message: 'ID incorrecto'
    //     })
    // }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)

        case 'GET':
            return getEntry(req,res)

        case 'DELETE':
            return deleteEntry(req,res)

        default:
            return res.status(400).json({ message: 'Metodo inexistente' })
    }

}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById(id)

    if (!entryToUpdate) {
        return res.status(400).json({
            message: 'No hay entrada con ese id ' + id
        })
    }

    const { description = entryToUpdate.description,
        status = entryToUpdate.status } = req.body


    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
        db.disconnect()
        res.status(200).json(updatedEntry!)

    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({
            message: error.errors.status.message
        })
    }

}


const getEntry = async(req:NextApiRequest,res:NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()

    const entryInDB = await Entry.findById(id)

    if (!entryInDB) {
        return res.status(400).json({
            message: 'No hay entrada con ese id ' + id
        })
    }

    return res.status(200).json(entryInDB)
 
}

const deleteEntry = async(req:NextApiRequest,res:NextApiResponse<Data>) => {

    const { id } = req.query

    await db.connect()

    const deletedEntry = await Entry.findById(id)

    if (!deletedEntry) {
        return res.status(400).json({
            message: 'No hay entrada con ese id ' + id
        })
    }

    try {
        await Entry.findByIdAndDelete(id)
        db.disconnect()
        return res.status(200).json(deletedEntry)
        
    } catch (error:any) {
        await db.disconnect()
        res.status(400).json({
            message: error.errors.status.message
        })    
    }

}