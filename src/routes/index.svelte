<script>
    import { onMount } from 'svelte';
    import { link } from "./store.js";
    let errorMessage = "";
    let traffic = [];

    async function validate() {
        try {
            const res = await fetch("/createLink", {
                method: "POST",
                body: JSON.stringify($link),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const resData = await res.json()
            
            if (res.status === 200) {
                // OK
                errorMessage = ""
            } else {
                errorMessage = resData.error
            }
            console.log(res)
        } catch (err) {
            errorMessage = "Server error"
        }

        await getUserTraffic();
    }

    async function getUserTraffic() {
        //CHECKING EXISTENCE OF URL
        const obj = await fetch("/userTraffic")
            .then((response) => response.json())
            .catch((err) => {
                console.log(err.message);
            });
        traffic = obj;
    }

    onMount(async () => {
        await getUserTraffic();
    })
</script>

<svelte:head>
    <title>SUS URL Shortener</title>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://p.ress.me:3000/" />
    <meta property="og:title" content="SUS URL Shortener | Link Disguiser" />
    <meta property="og:description" content="This may surprise you..." />
    <meta
        property="og:image"
        content="http://p.ress.me:3000/logo_nobg_small.png"
    />
</svelte:head>

<img src="logo_nobg.png" alt="background image" />
<h1>Make suspicious links!</h1>

<p />
<ul>
    <li>Disguise a link as another website by changing its metadata tags!</li>
    <li>Add a custom page title, description and thumbnail.</li>
    <li>
        See your fake information on link previews on WhatsApp, Telegram,
        Discord, Twitter and more!
    </li>
    <li>Mess with your friends and troll your enemies!</li>
</ul>

<br />

<h2>Disguise a new link</h2>

<form on:submit|preventDefault={validate}>
    <div class="content">
        <label for="url">URL</label>
        <input type="text" id="url" bind:value={$link.url} />
        <label for="map_url">Actual URL</label>
        <input type="text" id="map_url" bind:value={$link.map_url} />
        <label for="title">Title</label>
        <input type="text" id="title" bind:value={$link.title} />
        <label for="body">Body</label>
        <input type="text" id="body" bind:value={$link.body} />
        <label for="thumbnail_link">Thumbnail Link</label>
        <input
            type="text"
            id="thumbnail_link"
            bind:value={$link.thumbnail_link}
        />
        <label for="routing">Routing</label>
        <input type="text" id="routing" bind:value={$link.routing} />
        <label for="tl1">TL1</label>
        <input type="text" id="tl1" bind:value={$link.tl1} />
        <label for="tl2">TL2</label>
        <input type="text" id="tl2" bind:value={$link.tl2} />
        <label for="tl3">TL3</label>
        <input type="text" id="tl3" bind:value={$link.tl3} />
        <label for="tl4">TL4</label>
        <input type="text" id="tl4" bind:value={$link.tl4} />
        <label for="tl5">TL5</label>
        <input type="text" id="tl5" bind:value={$link.tl5} />
    </div>
    <button class="submitButton" type="submit"> Generate URL </button>
</form>

{#if !!errorMessage}
    <h5 class="error">{errorMessage}</h5>
{/if}

<!--
<p>{JSON.stringify($link, 0, 2)}</p>
-->
<br />

<h2>Your previously disguised links</h2>

<!-- List of previous links + traffic to links -->
{#if traffic.length == 0}
    <p class="centered">No links yet, create one now!</p>
{:else}
    <ul>
        {#each traffic as { url, view }}
            <li>
                {url}: {view}
            </li>
        {/each}
    </ul>
{/if}
<br />

<footer>Made for Intuition 7.0</footer>

<style>
    h1,
    p {
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    h2 {
        font-size: 1.6em;
        text-align: center;
        text-transform: uppercase;
        font-weight: 500;
        margin: 0 0 0.5em 0;
    }

    p {
        margin: 1em auto;
    }

    footer {
        color: rgba(0, 0, 0, 50%);
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }

    .content {
        display: grid;
        grid-template-columns: 20% 80%;
        grid-column-gap: 10px;
    }

    .submitButton {
        width: 40%;
        margin-left: 30%;
        margin-right: 30%;
    }

    .error {
        color: purple;
    }

    footer {
        text-align: center;
    }

    img {
        max-height: 200px;
        max-width: 200px;
        display: block;
        margin: 0 auto;
    }

    .centered {
        text-align: center;
    }
</style>
