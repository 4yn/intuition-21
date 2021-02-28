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

		// console.log(visitCount);

		await logVisit(slug, req.sessionID)

		const candidates = [link.map_url];
		for (let i of ['tl1', 'tl2', 'tl3', 'tl4', 'tl5']) {
			if (!!link[i]) {
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
				link.map_url = candidates[Math.min(visitCount, candidateLen - 1)]
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
}
