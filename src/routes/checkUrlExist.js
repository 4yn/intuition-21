const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function checkUrl(u) {
    // ... you will write your Prisma Client queries here
    console.log("CHECKING IF URL EXISRS")
    //console.log(prisma)

    //http://localhost:3000/create_db?url=test&map_url=f&title=t&body=b&thumbnail_link=tl&routing=r&tl1=tl

    const urlExists = await prisma.link.findUnique({
        where: {
            url: u,
        }
    })
    console.log(urlExists)

    console.log("FINISHED CHECKING")
    return urlExists
}

//TESTED
export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

    console.log("INSIDE GET")
    
	const { slug } = req.params;
    const upd = req.query;
    console.log(req.query)
    for (var i in req.query){
        console.log(i.toString() + " : " + req.query[i].toString())
    }
    //console.log(slug)
    //console.log(req.params)

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    const msg = await checkUrl(req.query.url).then((result) => {
        return result;
    }).catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

    console.log("DONE CHECKING EXISTENCE HERE")

    res.end(JSON.stringify({
        message: msg
    }));

    //res.end(lookup.get(slug));
}

