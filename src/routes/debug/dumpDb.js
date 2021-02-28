const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function dumpDb() {
    // ... you will write your Prisma Client queries here
    const allVisits = await prisma.visit.findMany({});
    const allLinks = await prisma.link.findMany({});
    return {
        visits: allVisits,
        links: allLinks
    }
}

export async function get(req, res, next) {
    // Dumps the entire DB

    try {
        const dumpedData = await dumpDb()

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(dumpedData));

    } catch (err) {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            error: err.message
        }));
    } finally {
        await prisma.$disconnect() 
    }

}
