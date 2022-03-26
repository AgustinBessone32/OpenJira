
interface SeedData{
    entries: SeedEntry[]
}

interface SeedEntry{
    description:string,
    status:string,
    createdAt:number
}



export const seedData:SeedData = {
    entries: [
        {
            description: 'Pendiente:lorem asdadasdasd',
            status:'pending',
            createdAt: Date.now()
        },
        {
            description: 'En progreso:lorem asfhuasfhaoifhosafhaosf',
            status:'in-progress',
            createdAt: Date.now() - 100000000
        },
        {
            description: 'terminada:lorem asdadasdasd',
            status:'finished',
            createdAt: Date.now() - 100000
        }
    ]
}