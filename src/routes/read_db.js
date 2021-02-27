const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function readDB() {
    // ... you will write your Prisma Client queries here
    console.log("READING FROM DB")
    console.log(prisma)
    const allUsers = await prisma.user.findMany({});
    console.log(allUsers)
    console.log("DONE")
    const allLinks = await prisma.link.findMany({});
    return {"users": allUsers, "links": allLinks}
}

export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	//const { slug } = req.params;

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    var msg = await readDB()
    .then((result) => {
        return result;
    })
    .catch(e => {
        throw e
    })
    .finally(async (x) => {
        console.log("HERE IN ASYNC")

        await prisma.$disconnect()
    })

    console.log(msg)
    console.log("HERE")

    res.end(JSON.stringify(msg));

}
