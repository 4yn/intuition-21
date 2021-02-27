const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function createLink(s, sid) {
    // ... you will write your Prisma Client queries here
    console.log("CREATING LINK IN  DB")

    //http://localhost:3000/create_db?url=test&map_url=f&title=t&body=b&thumbnail_link=tl&routing=r&tl1=tl

    const allLinks = await prisma.link.create({
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
    console.log("LINK ADDED TO DB")
    return allLinks
}

export async function post(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

    console.log("BODYYYY")
    console.log(req.body)

	// Check DB for link redirecting instructions and user traffic
    
    const upd = req.body;

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const msg = await createLink(upd, req.sessionID).then((result) => {
        return result;
    }).catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    console.log("DONE UPDATING DB WITH NEW LINK")

    res.end(JSON.stringify({
        message: msg
    }));

}



