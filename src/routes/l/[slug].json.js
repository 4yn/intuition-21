const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function getRandomInt(z){
	return Math.floor(Math.random()*Math.floor(z))
}

async function getLink(url) {
    const urlExists = await prisma.link.findUnique({
        where: {
            url: url,
        }
    });
    return urlExists
}

async function countVisits(url, session) {
    const visits = await prisma.visit.findMany({
        where: {
            session: session,
			link_visited: url
        }
    });
    return visits.length
}

async function logVisit(url, session) {
    const logVisit = await prisma.visit.create({
        data: {
            session: session,
			link_visited: url
        }
    });
    return logVisit
}

export async function get(req, res, next) {
	// Check DB for link redirecting instructions and user traffic

	const { slug } = req.params;

	try {
		const link = await getLink(slug)
		if (link == null) {
			throw new Error("Not found")
		}
		const visitCount = await countVisits(slug, req.sessionID);

		await logVisit(slug, req.sessionID)

		const candidates = [link.map_url];
		for (let i of ['tl1', 'tl2', 'tl3', 'tl4', 'tl5']) {
			if (link[i] !== null) {
				candidates.push(link[i])
			}
		}
		const candidateLen = candidates.length

		switch (link.routing) {
			case "RANDOM":
				link.map_url = candidates[getRandomInt(candidateLen)]
				break;
			case "CYCLE":
				link.map_url = candidates[visitCount % candidateLen]
				break;
			case "STOP":
				link.map_url = candidates[Math.max(visitCount, candidateLen - 1)]
				break;
			default: 
			throw new Error("Unknown routing")
		}
		
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(link));

	} catch (err) {

		if (err.message === "Not Found") {
			res.writeHead(404, {
				'Content-Type': 'application/json'
			});
		} else {
			res.writeHead(400, {
				'Content-Type': 'application/json'
			});
		}

		res.end(JSON.stringify({
			error: err.message
		}));

	} finally {
		await prisma.$disconnect()
	}

	// const tt = await numTimeVisited(req.sessionID, req.url)
	// .then((result) => {return result;})
	// .catch(e => {throw e})
	// .finally(async()=>{
	// 	await prisma.$disconnect()
	// })

	// console.log("USER LOGGED IN " + (tt.length).toString() + " TIMES")

    // const msg = await getUrlDB(req.url).then((result) => {
    //     return result;
    // }).catch(e => {
    //     throw e
    // })
    // .finally(async () => {
    //     await prisma.$disconnect()
    // })

	// console.log("MESSAGE")
	// console.log(msg)

	// if (msg == null || (!("url" in msg))){

	// 	res.writeHead(404, {
	// 		'Content-Type': 'application/json'
	// 	});

	// 	res.end(JSON.stringify({
	// 		message: `Link not found`
	// 	}));
	// } else {

	// 	console.log("LINK FOUND")
	// 	console.log(msg.map_url)

	// 	const ww = await createUser(req.sessionID, req.url)
	// 	.then((result) => {return result;})
	// 	.catch(e => {throw e})
	// 	.finally(async()=>{
	// 		await prisma.$disconnect()
	// 	})

	// 	var lena = 1
	// 	for (let i = 1; i <= 5; i++){
	// 		if (msg['tl'+i.toString()] == null){
	// 			lena += i;
	// 			break;
	// 		}
	// 		if (i == 5) lena += 5;
	// 	}

	// 	if (msg.routing=="CYCLE"){
	// 		var k = tt.length;
	// 		k = k%lena;
	// 		if (k != 0) msg.map_url=msg['tl'+k.toString()];
	// 	} else if (msg.routing=="RANDOM"){
	// 		var k = getRandomInt(lena);
	// 		if (k != 0) msg.map_url=msg['tl'+k.toString()];
	// 	} else {
	// 		var k = tt.length
	// 		if (k >= lena) k = lena - 1;
	// 		if (k != 0) msg.map_url=msg['tl'+k.toString()];
	// 	}

	// 	console.log("GOING TO REDIRECT")
	// 	console.log(msg.map_url)
	// 	console.log("VISITED FOR THE " + (tt.length).toString())

	// 	res.writeHead(200, {
	// 		'Content-Type': 'application/json'
	// 	});

	// 	res.end(JSON.stringify(msg));

	// 	/*
	// 	res.end(JSON.stringify({
	// 		message: "Visited " + msg.map_url + " A TOTAL OF " + (tt.length).toString()
	// 	}));

	// 	//res.end(lookup.get(slug));
	// 	*/
	// }
}
