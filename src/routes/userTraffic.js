const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function userTraffic(sess) {

    const nt = await prisma.link.findMany({
        where: {
            creator: sess,
        }
    });

    return nt
}

//RETURNS THE NUMBER OF VISITS TO URL u
async function getNum(u) {

    const nt = await prisma.user.findMany({
        where: {
            link_visited: u,
        }
    });

    return nt.length
}

export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	const tt = await userTraffic(req.sessionID)
	.then((result) => {return result;})
	.catch(e => {throw e})
	.finally(async()=>{
		await prisma.$disconnect()
	})

    var thisarr = [];

    for (var i = 0; i < tt.length; i++){
        const ww = await getNum(tt[i].url)
        .then((result) => {return result;})
        .catch(e => {throw e})
        .finally(async()=>{
            await prisma.$disconnect()
        });
        thisarr.push({"url": tt[i].url, "view": ww});
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(thisarr));

}
