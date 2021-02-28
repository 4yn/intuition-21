<script>
    import { onMount } from "svelte";
    import { link } from "./store.js";
    let errorMessage = "";
    let successMessage = "Generate SUS URL";
    let traffic = [];
    let linkCount = 1;

    async function validate() {
        ["map_url", "tl1", "tl2", "tl3", "tl4", "tl5"].map((x, i) => {
            if (i >= linkCount) {
                $link[x] = "";
            }
        });

        try {
            const res = await fetch("/createLink", {
                method: "POST",
                body: JSON.stringify($link),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const resData = await res.json();

            if (res.status === 200) {
                // OK
                errorMessage = "";
                successMessage = "Link copied!";

                copyToClipboard(`https://p.ress.me/l/${resData.message}`);

                setTimeout(() => {
                    successMessage = "Generate SUS URL";
                }, 5000);
            } else {
                errorMessage = resData.error;
            }
            console.log(res);
        } catch (err) {
            errorMessage = "Server error";
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
    });

    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;

        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            // console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            // console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }
    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(
            function () {
                // console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                // console.error("Async: Could not copy text: ", err);
            }
        );
    }
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

<img src="logo_nobg.png" alt="background" />
<h1>Make suspicious links!</h1>

<ul>
    <li>Disguise a link as another website by changing its metadata tags!</li>
    <li>Add a custom page title, description and thumbnail.</li>
    <li>
        See your fake information on link previews on WhatsApp, Telegram,
        Discord, Twitter and more!
    </li>
    <li>Mess with your friends and troll your enemies!</li>
</ul>

<p>
    Take a look at our <a href="https://github.com/4yn/intuition-21">Github</a>
    and
    <a href="https://devpost.com/software/sus-url-shortener">Devpost</a>
</p>

<p><a href="/explain">Find out how it works</a></p>

<br />

<h2>Disguise a new link</h2>

<form on:submit|preventDefault={validate}>
    <div class="content">
        <!-- <label for="url">URL</label>
        <input type="text" maxlength=300 id="url" bind:value={$link.url} /> -->

        <div class="form-subheader">Link Preview Options</div>
        <div class="form-explain">
            <p>
                Change how your link will look in rich text / embedded previews
                on various messaging apps.
            </p>
        </div>

        <label for="title">Title</label>
        <input
            type="text"
            maxlength="300"
            id="title"
            bind:value={$link.title}
        />
        <label for="body">Body</label>
        <input type="text" maxlength="300" id="body" bind:value={$link.body} />
        <label for="thumbnail_link">Thumbnail</label>
        <input
            type="text"
            id="thumbnail_link"
            bind:value={$link.thumbnail_link}
        />

        <div class="form-subfooter" />

        <div class="form-subheader">Destination Options</div>

        <div class="form-explain">
            <p>
                Set one or more links to redirect to.
                <br />
                If you have more than one link, you can decide if your
                <strike>victims</strike> friends will be directed to all the links
                in order or randomly! Pick up to 6 links.
            </p>
        </div>

        <label for="map_url">Long URL(s)</label>
        <input
            type="text"
            maxlength="300"
            id="map_url"
            bind:value={$link.map_url}
        />

        {#if linkCount > 1}
            <label for="tl1" />
            <input
                type="text"
                maxlength="300"
                id="tl1"
                bind:value={$link.tl1}
            />
        {/if}
        {#if linkCount > 2}
            <label for="tl2" />
            <input
                type="text"
                maxlength="300"
                id="tl2"
                bind:value={$link.tl2}
            />
        {/if}
        {#if linkCount > 3}
            <label for="tl3" />
            <input
                type="text"
                maxlength="300"
                id="tl3"
                bind:value={$link.tl3}
            />
        {/if}
        {#if linkCount > 4}
            <label for="tl4" />
            <input
                type="text"
                maxlength="300"
                id="tl4"
                bind:value={$link.tl4}
            />
        {/if}
        {#if linkCount > 5}
            <label for="tl5" />
            <input
                type="text"
                maxlength="300"
                id="tl5"
                bind:value={$link.tl5}
            />
        {/if}
        <label for="adjust-link" />
        <div id="adjust-link">
            {#if linkCount !== 6}
                <button
                    type="button"
                    on:click={() => {
                        linkCount += 1;
                    }}>Add another link to the redirect chain</button
                >
            {/if}
            {#if linkCount !== 1 && linkCount !== 6}
                <br />
            {/if}
            {#if linkCount !== 1}
                <button
                    type="button"
                    on:click={() => {
                        linkCount -= 1;
                    }}>Remove a link from the redirect chain</button
                >
            {/if}
        </div>

        {#if linkCount !== 1}
            <label for="routing">Routing</label>
            <select name="routing" id="routing" bind:value={$link.routing}>
                <option value="STOP">Stop at the last link</option>
                <option value="CYCLE">Keep looping through all the links</option
                >
                <option value="RANDOM">Go to a random link in the list</option>
            </select>
        {/if}

        <div class="form-subfooter" />

        <button class="submitButton" type="submit">{successMessage}</button>
    </div>
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
    <p class="centered">No links yet, why not create one now!</p>
{:else}
    <p>Click on a link to copy!</p>
    <ul id="link-list">
        {#each traffic as { url, view }}
            <li>
                <span
                    class="link-copy"
                    on:click={() => {
                        copyToClipboard(`https://p.ress.me/l/${url}`);
                    }}>https://p.ress.me/l/{url}</span
                >: {view} view{view === 1 ? "" : "s"}
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
        font-size: 1.5rem;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
    }

    .content .form-subheader {
        grid-column: 1 / 3;
        border-bottom: 0.125rem solid black;
    }

    .content .form-explain {
        grid-column: 1 / 3;
        margin-top: -0.5rem;
        font-size: 1rem;
    }

    .content .form-subfooter {
        grid-column: 1 / 3;
        margin-bottom: 0.5rem;
    }

    .content input,
    .content select {
        border-radius: 0.5rem;
        border: 2px solid rgba(0, 0, 0, 0.3);
        padding: 0.25rem;
        font-size: 1.25rem;
    }

    .content #adjust-link button {
        font-size: 1rem;
    }

    .submitButton {
        grid-column: 1 / 3;
        margin: 1rem 0rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        font-size: 2rem;
        width: 100%;
        border: none;
        text-align: center;
        color: #ffffff;
        background-color: #d1603d;
    }

    .error {
        color: purple;
    }

    #link-list li {
        list-style-type: none;
    }

    #link-list .link-copy {
        text-decoration: underline;
        color: #6c91bf;
        cursor: pointer;
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
