<script>
</script>

<svelte:head>
    <title>SUS URL Shortener Explained</title>
    <meta property="og:type" content="website" />
    <meta property="og:url" content="http://p.ress.me:3000/" />
    <meta property="og:title" content="SUS URL Shortener | Explained" />
    <meta property="og:description" content="Find out how it works" />
    <meta
        property="og:image"
        content="http://p.ress.me:3000/logo_nobg_small.png"
    />
</svelte:head>

<img src="logo_nobg.png" alt="background image" />
<h1>Make suspicious links!</h1>

<h2>What is going on here?</h2>

<p>
    Nowadays, social media websites like to show link previews before people
    click on links and are directed out of their application. They get this
    information through things like metadata tags inside the <code
        >&lt;head&gt;</code
    >
    elements of a HTML document. Movements such as the
    <a href="https://ogp.me/">Open Graph protocol</a>
    and
    <a
        href="https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started"
        >Twitter card protocol</a
    >
    helps push this &#39;rich-information&#39; closer to the user.
</p>

<img src="troll_1.png" class="troll" alt="background image" />

<p>
    We decided to create a link shortener website that lets you put your own
    interesting content in front of a shortened URL. While services such as
    tinyurl and bit.ly serve HTTP 301 codes which will point the link preview
    content towards the actual page you are headed towards, we serve a webpage
    with custom
    <code>&lt;meta&gt;</code> tags so that we have the right link previews inside
    of social media, and do the navigation via inline javascript instead.
</p>

<img src="troll_2.png" class="troll" alt="background image" />

<p>All this just to mislead people!</p>
<p>
    We also let people have their links redirect to more than one thing at once.
    Each subsequent time someone visits the shortened link they may be brought
    to a different landing page. You can make it such that someone might get
    rick-rolled the first time round they click the URL, but on subsequent tries
    everything may look completely normal.
</p>

<p>Some links you could try for yourself:</p>
<ul>
    <li>
        <a href="https://p.ress.me/l/join-among-us-test"
            >https://p.ress.me/l/join-among-us-test</a
        >
    </li>
    <li>
        <a href="https://p.ress.me/l/gpay-last-chance"
            >https://p.ress.me/l/gpay-last-chance</a
        >
    </li>
    <li>
        <a href="https://p.ress.me/l/nitro-eastco2412"
            >https://p.ress.me/l/nitro-eastco2412</a
        >
    </li>
</ul>

<p>
    If you came here using the link at <a href="https://p.ress.me/l/demo-tour"
        >https://p.ress.me/l/demo-tour</a
    >, the first time you clicked the link you were brought to the landing page.
    This explanation page was probably the second thing that you saw. The next
    time you click the link you can see our devpost, and after that you might
    have a little surprise!
</p>

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

    img.troll {
        max-height: 600px;
        max-width: 80%;
        display: block;
        margin: 0 auto;
    }

    .centered {
        text-align: center;
    }
</style>
