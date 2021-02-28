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
    },
    {
        "url": "gpay-last-chance",
        "map_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "title": "The huat pals party isn't over yet!",
        "body": "CNY isn't over until the huat pals say so! Invite friends to google pay for one last chance at the $88.88 SGD prize! Two days left only!", "thumbnail_link": "https://i2.wp.com/sethisfy.com/wp-content/uploads/2021/02/bbloh.jpg?w=1200&ssl=1",
        "routing": "STOP", "tl1": "", "tl2": "", "tl3": "", "tl4": "", "tl5": "",
        "creator": "1FHZUiUJSeuBpnrD6TqD1DEumqbjkvWq"
    },
    {
        "url": "gpay-bonus",
        "map_url": "https://p.ress.me/explain-haha",
        "title": "The huat pals party isn't over yet!",
        "body": "CNY isn't over until the huat pals say so! Invite friends to google pay for one last chance at the $88.88 SGD prize! Two days left only!", "thumbnail_link": "https://i2.wp.com/sethisfy.com/wp-content/uploads/2021/02/bbloh.jpg?w=1200&ssl=1",
        "routing": "STOP", "tl1": "", "tl2": "", "tl3": "", "tl4": "", "tl5": "",
        "creator": "1FHZUiUJSeuBpnrD6TqD1DEumqbjkvWq"
    },
    {
        "url": "nitro-eastco2412",
        "map_url": "https://www.youtube.com/watch?v=Tt7bzxurJ1I",
        "title": "Claim your Discord Nitro gift, expiring in 24 hours",
        "body": "You got a gift from EastCoastPlan#2412. Claim before the gift expires",
        "thumbnail_link": "https://discordgift.site/logo.png",
        "routing": "STOP", "tl1": "", "tl2": "", "tl3": "", "tl4": "", "tl5": "",
        "creator": "1FHZUiUJSeuBpnrD6TqD1DEumqbjkvWq"
    },
    {
        "url": "demo-tour",
        "map_url": "https://p.ress.me/",
        "title": "Try out the SUS URL Shortener",
        "body": "Click on this link a bunch of times. You'll go different places each time.",
        "thumbnail_link": "https://p.ress.me/logo_nobg.png",
        "routing": "CYCLE",
        "tl1": "https://p.ress.me/explain",
        "tl2": "https://devpost.com/software/sus-url-shortener",
        "tl3": "https://www.youtube.com/watch?v=GJDNkVDGM_s",
        "tl4": "", "tl5": "",
        "creator": "giUG_Q7kGg8W58H0mP1qjMow1SeQhQin"
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