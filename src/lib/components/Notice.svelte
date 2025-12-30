<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	let { children, onclose } = $props<{
		children: Snippet;
		onclose: () => void;
	}>();
</script>

<div
	class="bg-opacity-60 flex w-full items-center bg-violet-500 p-6 leading-none text-white backdrop-blur-lg sm:inline-flex sm:w-auto sm:rounded-full sm:p-4"
	role="alert"
>
	<span class="mr-2 w-full flex-auto text-left font-semibold">
		{@render children()}
	</span>
	<button
		type="button"
		class="cursor-pointer opacity-75"
		onclick={onclose}
		aria-label="Close notice"
	>
		<X class="h-4 w-4" />
	</button>
</div>
