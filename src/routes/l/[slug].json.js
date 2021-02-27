const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function getUrlDB(u) {

	if (u.endsWith(".json")){
		u = u.slice(3, u.length - 5);
	} else {
		u = u.slice(3, u.length);
	}

    console.log("READING FROM DB")
    const urlExists = await prisma.link.findUnique({
        where: {
            url: u,
        }
    });
    return urlExists
}

export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	console.log(req.url)

    const msg = await getUrlDB(req.url).then((result) => {
        return result;
    }).catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

	console.log("MESSAGE")
	console.log(msg)

	if (msg == null || (!("url" in msg))){

		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Link not found`
		}));
	} else {

		console.log("LINK FOUND")
		console.log(msg.map_url)
		res.writeHead(201, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: msg.map_url
		}));

		//res.end(lookup.get(slug));
	}
}
