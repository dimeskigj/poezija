<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte';
	import Notice from '$lib/components/Notice.svelte';
	import ShareableImage from '$lib/components/ShareableImage.svelte';
	import { Sun, Moon, Copy, Check, Flame, Image } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { logAppOpen } from '$lib/services/analytics';
	import { StreakService } from '$lib/services/streak';
	import { STORAGE_KEYS } from '$lib/constants';

	let { data } = $props();

	let hasSeenNotice = $state(true);
	let isCopied = $state(false);
	let streak = $state(0);
	let showShareableImage = $state(false);

	onMount(() => {
		logAppOpen();
		hasSeenNotice = localStorage.getItem(STORAGE_KEYS.HAS_SEEN_NOTICE) === 'true';

		streak = StreakService.updateAndGetStreak();

		if (browser) {
			const url = new URL(window.location.href);
			if (url.searchParams.has('id')) {
				url.searchParams.delete('id');
				history.replaceState({}, '', url.pathname);
			}
		}
	});

	function onNoticeClosed() {
		hasSeenNotice = true;
		localStorage.setItem(STORAGE_KEYS.HAS_SEEN_NOTICE, 'true');
	}

	function share() {
		if (browser) {
			const url = new URL(window.location.origin + window.location.pathname);
			url.searchParams.set('id', data.poemIndex.toString());
			navigator.clipboard.writeText(url.toString());

			isCopied = true;
			setTimeout(() => {
				isCopied = false;
			}, 2000);
		}
	}
</script>

<div
	class="relative flex min-h-screen flex-col bg-linear-to-br from-white to-violet-50 text-slate-900 transition-colors duration-300 dark:from-slate-900 dark:to-slate-950 dark:text-slate-100"
>
	<div class="fixed top-4 right-4 z-50 flex items-center gap-3">
		{#if streak > 0}
			<div
				class="flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-3 text-sm font-bold text-orange-600 shadow-sm backdrop-blur-sm dark:border-orange-900/50 dark:bg-orange-950/50 dark:text-orange-400"
				title="{streak} дена по ред читаш!"
			>
				<Flame class="h-5 w-5 animate-pulse fill-orange-600 text-orange-500" />
				<span>{streak}</span>
			</div>
		{/if}

		<button
			onclick={() => (showShareableImage = true)}
			class="rounded-full border border-slate-200 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700"
			aria-label="Create shareable image"
			title="Сподели како слика"
		>
			<Image class="h-5 w-5" />
		</button>

		<button
			onclick={() => theme.toggle()}
			class="rounded-full border border-slate-200 bg-white/80 p-3 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700"
			aria-label="Toggle theme"
		>
			{#if !theme.isDark}
				<Sun class="h-5 w-5" />
			{:else}
				<Moon class="h-5 w-5" />
			{/if}
		</button>
	</div>

	<main class="mx-auto w-full max-w-3xl grow px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
		{#if data.poemHtml}
			<article class="poem-article mx-auto prose prose-slate lg:prose-xl dark:prose-invert">
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html data.poemHtml}
			</article>

			<div class="mt-12 flex justify-start">
				<button
					onclick={share}
					class="flex items-center gap-2 rounded-full bg-violet-100 px-6 py-3 font-medium text-violet-700 transition-colors hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
					aria-label="Share poem"
				>
					{#if !isCopied}
						<Copy class="h-5 w-5" />
					{:else}
						<Check class="h-5 w-5 text-green-500" />
					{/if}
					<span>Копирај врска</span>
				</button>
			</div>
		{:else}
			<div class="flex justify-center py-20">
				<div class="spinner"></div>
			</div>
		{/if}
	</main>

	<footer
		class="mt-auto border-t border-slate-200 bg-white/50 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/30"
	>
		<div
			class="mx-auto max-w-3xl px-6 pt-10 pb-12 text-center text-sm text-slate-500 sm:px-8 lg:px-12 dark:text-slate-400"
		>
			<h4 class="mb-4 text-start text-xl text-slate-700 dark:text-slate-200">За апликацијата ✒️</h4>
			<p class="mb-4 text-start">
				Ова е едноставна апликација која прикажува „случајна“ поема секој ден - и тоа различна за
				секој корисник. Визијата е да се споделуваат македонски поеми во едноставен формат со цел да
				се поттикне читањето (и некому да се разубави моментот).
			</p>
			<div class="flex justify-start gap-1">
				<p>Направено со 💜 за вас</p>
				<p>-</p>
				<a
					href="https://github.com/dimeskigj/poezija/"
					class="text-violet-600 hover:underline dark:text-violet-400">Изворен код</a
				>
			</div>
		</div>
	</footer>

	{#if !hasSeenNotice}
		<div class="pointer-events-none fixed right-0 bottom-4 left-0 flex justify-center px-4">
			<div class="pointer-events-auto">
				<Notice onclose={onNoticeClosed}>Можеш да дојдеш утре за нова поема!</Notice>
			</div>
		</div>
	{/if}

	{#if showShareableImage}
		<ShareableImage
			poemHtml={data.poemHtml}
			poemIndex={data.poemIndex}
			onclose={() => (showShareableImage = false)}
		/>
	{/if}
</div>
