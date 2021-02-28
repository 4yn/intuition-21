const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function listLinks(sess) {
    const links = await prisma.link.findMany({
        where: {
            creator: sess,
        }
    });
    return links
}

//RETURNS THE NUMBER OF VISITS TO URL u
async function countVisits(url) {
    const visits = await prisma.visit.findMany({
        where: {
            link_visited: url,
        }
    });
    return visits.length
}

export async function get(req, res, next) {
    // Gets a list of all of this user's created links and the traffic to these links
    
    try {

        const links = await listLinks(req.sessionID);

        const data = []
        for (let link of links) {
            const visits = await countVisits(link.url)
            data.push({
                url: link.url,
                view: visits
            })
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(data));

    } catch (err) {

        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: err.message
        }));

    } finally {
        await prisma.$disconnect()
    }
}
