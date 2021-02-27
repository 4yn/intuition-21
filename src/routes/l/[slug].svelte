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
	onMount(() => goto('https://www.youtube.com/watch?v=dQw4w9WgXcQ'));
</script>

<svelte:head>
	<title>{link.title}</title>
</svelte:head>

<div class="content">
	<!-- Do the redirect here -->
	🤔 <!-- :thinking: -->
</div>
