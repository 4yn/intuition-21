<script>
    import { link } from "./store.js";
    let errorTag = { showError: false };

    function toUrlQuery(obj){
        var str = "?"
        var first = true
        for (var i in obj){
            if (first) first = false;
            else str = str + "&"

            str = str + i.toString() + "=" + obj[i].toString()
        }
        return str;
    }

    async function validate(){

        console.log("PREPARING FORM FOR SUBMISSION")
        console.log(JSON.stringify($link))

        //CHECKING EXISTENCE OF URL
        const obj = await fetch('/checkUrlExist?url=' + ($link.url).toString())
        .then((response) => response.json())
        .catch(err => {
            // POST error: do something...
            console.log('POST error', err.message)
        })

        if (obj.message == null || (!("url" in obj.message))){
            errorTag.showError=false;
            console.log("URL DOES NOT EXIST, PROCEEDING TO ADD IT IN")
            console.log('/create_link' + toUrlQuery($link))
            console.log("BODY HERE SVELTE")
            console.log(JSON.stringify($link))
            fetch('/create_link', {
                method: 'POST',
                body: JSON.stringify($link),
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                .then(r => {
                r.json()
                    .then(function(result) {
                        console.log("IN THEN")
                        console.log(result)
                    // The data is posted: do something with the result...
                    })
                })
                .catch(err => {
                // POST error: do something...
                console.log('POST error', err.message)
                }
            )
        } else {
            console.log("URL ALREADY EXIST!")
            console.log("PRINT ERROR MESSAGE")
            errorTag.showError=true;
        }
    }
</script>

<style>
	h1, p {
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

    .error {
        color: purple,
    }
</style>

<svelte:head>
	<title>SUS URL Shortener</title>
</svelte:head>

<h1>Make suspicious links!</h1>

<p>
	<ul>
		<li>Disguise a link as another website by changing its metadata tags!</li>
		<li>Add a custom page title, description and thumbnail.</li>
		<li>See your fake information on link previews on WhatsApp, Telegram, Discord, Twitter and more!</li>
		<li>Mess with your friends and troll your enemies!</li>
	</ul>	

<br/>

<h2>
	Disguise a new link
</h2>

<h1>Form</h1>

<form class="content" on:submit|preventDefault={validate}>
    <label>URL</label>
    <input type="text" bind:value={$link.url} />
    <label>Actual URL</label>
    <input type="text" bind:value={$link.map_url} />
    <label>Title</label>
    <input type="text" bind:value={$link.title} />
    <label>Body</label>
    <input type="text" bind:value={$link.body} />
    <label>Thumbnail Link</label>
    <input type="text" bind:value={$link.thumbnail_link} />
    <label>Routing</label>
    <input type="text" bind:value={$link.routing} />
    <label>TL1</label>
    <input type="text" bind:value={$link.tl1} />
    <label>TL2</label>
    <input type="text" bind:value={$link.tl2} />
    <label>TL3</label>
    <input type="text" bind:value={$link.tl3} />
    <label>TL4</label>
    <input type="text" bind:value={$link.tl4} />
    <label>TL5</label>
    <input type="text" bind:value={$link.tl5} />

    <button type="submit">
        Press some more
    </button>
</form>

{#if errorTag.showError}
    <h5 class="error">
        URL ALREADY EXISTS
    </h5>
{/if}

<p>{JSON.stringify($link, 0, 2)}</p>

<br/>

<h2>
	Your previously disguised links
</h2>

<!-- List of previous links + traffic to links -->

<br/>

<footer>
	Made for Intuition 7.0
</footer>