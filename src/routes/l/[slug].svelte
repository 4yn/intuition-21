<script context="module">
	export async function preload({ params }) {
		// Load the link data here
		const res = await this.fetch(`l/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { link: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let link;
	import { onMount } from 'svelte';
    import { goto } from '@sapper/app';
	onMount(() => goto(link.map_url));
</script>

<svelte:head>
	<title>{link.title}</title>
    <meta property="og:type" content="website">
    <meta property="og:title" content={link.title}>
    <meta property="og:description" content={link.body}>
    <meta property="og:image" content={link.thumbnail_link}>
</svelte:head>

<div class="content">
	<!-- Do the redirect here -->
	🤔 <!-- :thinking: -->
</div>
