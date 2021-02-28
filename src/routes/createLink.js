const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const charSpace = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'

function getRandomInt(z){
	return Math.floor(Math.random()*Math.floor(z))
}

function generateSlug(length) {
    return Array(length).fill(0).map((_) => charSpace[getRandomInt(charSpace.length)]).join('')
}

async function isLinkTaken(url) {
    const link = await prisma.link.findUnique({
        where: {
            url: url,
        }
    })

    return link !== null
}

//http://localhost:3000/create_db?url=test&map_url=f&title=t&body=b&thumbnail_link=tl&routing=r&tl1=tl
async function createLink(s, sid) {
    // Check if link exists
    if (await isLinkTaken(s.url)) {
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
        let newUrl = generateSlug(8);
        while (await isLinkTaken(newUrl)) {
            newUrl = generateSlug(8);
        }
        console.log(newUrl)
        newLinkData.url = newUrl;

        const link = await createLink(newLinkData, req.sessionID)

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({
            message: link.url
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