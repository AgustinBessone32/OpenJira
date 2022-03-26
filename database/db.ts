import mongoose from "mongoose";

// 0 desconectado
// 1 conectado
// 2 conectando
// 3 desconectando


const mongoConnection = {
    isConnected: 0
}

export const connect = async() => {
    if(mongoConnection.isConnected){
        return
    }

    if(mongoose.connections.length > 0 ) {
        mongoConnection.isConnected= mongoose.connections[0].readyState
    
        if(mongoConnection.isConnected === 1) {
            console.log('usando conexion anterios')
            return
        }

        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_URL || '')
    mongoConnection.isConnected = 1
    console.log('Conectado a', process.env.MONGO_URL)
}

export const disconnect = async() =>{

    if(process.env.NODE_ENV === 'development') return

    if(mongoConnection.isConnected === 0) return

    await mongoose.disconnect()

    console.log('Desconectado de Mongo')
}