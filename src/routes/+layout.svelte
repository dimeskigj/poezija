<script lang="ts">
	import './layout.css';
	import { theme } from '$lib/theme.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			if (theme.isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});
</script>

<svelte:head>
	<title>Поезија</title>
</svelte:head>

{@render children()}
