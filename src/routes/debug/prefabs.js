const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const data = [
    {
        "url": "join-among-us-test",
        "map_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "title": "Join Game",
        "body": "Join your crewmates in a multiplayer game of teamwork and betrayal!  Play online or over local wifi with 4-10 players as you attempt to hold your spaceship together and return back to civilization. But beware...as there may be an alien impostor aboard!",
        "thumbnail_link": "https://media.tenor.com/images/4fd84ce089213c585acf81d2cb0d7b44/tenor.gif",
        "routing": "CYCLE",
        "tl1": "https://www.youtube.com/watch?v=s3Q80mk7bxE",
        "tl2": "https://www.youtube.com/watch?v=DVx8L7a3MuE",
        "tl3": "https://www.youtube.com/watch?v=bc0KhhjJP98",
        "tl4": "https://www.youtube.com/watch?v=mrbEKl0M3wQ",
        "tl5": "https://www.youtube.com/watch?v=JCQVnSOFqfM",
        "creator": "_q8Et0IXdFWpjzf9Mdc-J7E9977hDzaj",
    }
]

async function isLinkTaken(url) {
    const link = await prisma.link.findUnique({
        where: {
            url: url,
        }
    })

    return link !== null
}

async function createLink(data) {
    // Check if link exists
    if (await isLinkTaken(data.url)) {
        throw new Error("Link already exists")
    }

    // Actually create the new link
    const newLink = await prisma.link.create({ data: data });
    return newLink
}

export async function get(req, res, next) {
    console.log('prefab')
    try {
        for (let link of data) {
            console.log(link.url)
            try {
                await createLink(link)
            } catch (err) {
            }
        }
    } catch (err) {
    } finally {
        await prisma.$disconnect()
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify({
        message: 'prefabs'
    }));
}