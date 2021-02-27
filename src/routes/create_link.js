const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function createLink(s) {
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
        }
    });
    console.log("LINK ADDED TO DB")
    return allLinks
}

export async function post(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	// Check DB for link redirecting instructions and user traffic
    
    const upd = req.query;

    for (var i in upd){
        console.log(i.toString() + " : " + req.query[i].toString())
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const msg = await createLink(upd).then((result) => {
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



