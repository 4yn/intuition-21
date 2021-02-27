const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function getUrl(u){
	if (u.endsWith(".json")){
		return u.slice(3, u.length - 5);
	} else {
		return u.slice(3, u.length);
	}
}

async function getUrlDB(u) {

	u = getUrl(u);

    console.log("READING FROM DB")
    const urlExists = await prisma.link.findUnique({
        where: {
            url: u,
        }
    });
    return urlExists
}

async function numTimeVisited(sess, u) {

	u = getUrl(u);

    const nt = await prisma.user.findMany({
        where: {
            session: sess,
			link_visited: u
        }
    });
	console.log("IN NUM VISITED")
	console.log(nt)

    return nt
}

async function createUser(sess, u) {

	u = getUrl(u);

    const mm = await prisma.user.create({
        data: {
            session: sess,
			link_visited: u
        }
    });

	console.log("ENTRY CREATED WITH MSG")
	console.log(mm)

    return mm
}

export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	console.log(req.url)
	console.log(req.session)
	console.log(req.sessionID)

	const tt = await numTimeVisited(req.sessionID, req.url)
	.then((result) => {return result;})
	.catch(e => {throw e})
	.finally(async()=>{
		await prisma.$disconnect()
	})

	console.log("USER LOGGED IN " + (tt.length).toString() + " TIMES")

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

		const ww = await createUser(req.sessionID, req.url)
		.then((result) => {return result;})
		.catch(e => {throw e})
		.finally(async()=>{
			await prisma.$disconnect()
		})

		res.writeHead(201, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: "Visited " + msg.map_url + " A TOTAL OF " + (tt.length).toString()
		}));

		//res.end(lookup.get(slug));
	}
}
