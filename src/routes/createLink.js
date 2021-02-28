const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//http://localhost:3000/create_db?url=test&map_url=f&title=t&body=b&thumbnail_link=tl&routing=r&tl1=tl
async function createLink(s, sid) {
    // Check if link exists
    const checkLink = await prisma.link.findUnique({
        where: {
            url: s.url,
        }
    })
    if (checkLink !== null) {
        throw new Error("Link already exists")
    }

    // Actually create the new link
    const newLink = await prisma.link.create({
        data:{
            url: s.url,
            map_url: s.map_url,
            title: s.title,
            body: s.body,
            thumbnail_link: s.thumbnail_link,
            routing: s.routing,
            tl1: s.tl1,
            tl2: s.tl2,
            tl3: s.tl3,
            tl4: s.tl4,
            tl5: s.tl5,
            creator: sid
        }
    });
    return newLink
}

export async function post(req, res, next) {

    // new link data
    const newLinkData = req.body;
    try {
        const msg = await createLink(newLinkData, req.sessionID)

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: msg.url
        }));
        
    } catch (err) {
        // Already exists

        res.writeHead(400, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            error: err.message
        }));

    } finally {
        await prisma.$disconnect()
    }
}