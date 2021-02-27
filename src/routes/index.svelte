<script>
	import successkid from 'images/successkid.jpg';
	const { PrismaClient } = require('@prisma/client')

	const prisma = new PrismaClient()

	// A `main` function so that you can use async/await
	async function main() {
	// ... you will write your Prisma Client queries here
	const allUsers = await prisma.user.findMany()
	console.log(allUsers)


	const allUsers2 = await prisma.user.findMany({

		include: { posts: true },

	})

	// use `console.dir` to print nested objects

	console.dir(allUsers2, { depth: null })
	}

	main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})

</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
