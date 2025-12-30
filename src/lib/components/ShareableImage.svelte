<script lang="ts">
	import { X, Shuffle, Share2 } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { untrack } from 'svelte';
	import html2canvas from 'html2canvas-pro';
	import { THEMES } from '$lib/share-themes';

	interface Props {
		poemHtml: string;
		poemIndex: number;
		onclose: () => void;
	}

	let { poemHtml, poemIndex, onclose }: Props = $props();

	let cardRef: HTMLDivElement | undefined = $state();
	let themeIndex = $state(untrack(() => poemIndex % THEMES.length));

	const currentTheme = $derived(THEMES[themeIndex]);

	$effect(() => {
		if (browser) {
			document.body.style.overflow = 'hidden';
			return () => {
				document.body.style.overflow = '';
			};
		}
	});

	function randomizeTheme(): void {
		let newIndex: number;
		do {
			newIndex = Math.floor(Math.random() * THEMES.length);
		} while (newIndex === themeIndex && THEMES.length > 1);
		themeIndex = newIndex;
	}

	async function shareImage(): Promise<void> {
		if (!browser || !cardRef) return;

		try {
			const canvas = await html2canvas(cardRef, {
				scale: 2,
				backgroundColor: null,
				useCORS: true,
				scrollY: 0,
				height: cardRef.offsetHeight
			});

			canvas.toBlob(async (blob) => {
				if (!blob) return;

				const file = new File([blob], `poezija-${poemIndex}.png`, { type: 'image/png' });

				if (navigator.canShare && navigator.canShare({ files: [file] })) {
					await navigator.share({
						files: [file],
						title: 'Поезија',
						text: 'Прочитај ја твојата дневна песна на poezija.dimeski.net'
					});
				} else {
					const link = document.createElement('a');
					link.download = `poezija-${poemIndex}.png`;
					link.href = canvas.toDataURL('image/png');
					link.click();
				}
			}, 'image/png');
		} catch (error) {
			console.error('Error sharing:', error);
		}
	}

	function handleBackdropClick(event: MouseEvent): void {
		if (event.target === event.currentTarget) {
			onclose();
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape') {
			onclose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-100 flex items-center justify-center bg-black/70 p-2 backdrop-blur-sm sm:p-4"
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
	aria-label="Исклучи модал"
	role="dialog"
	aria-modal="true"
	tabindex="-1"
>
	<div class="relative flex max-h-[95vh] w-full max-w-2xl flex-col sm:max-h-[90vh]">
		<div class="mb-2 flex justify-end gap-2 sm:mb-4">
			<button
				onclick={randomizeTheme}
				class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 sm:gap-2 sm:px-4 sm:py-2"
				aria-label="Случајна боја"
				title="Случајна боја"
			>
				<Shuffle class="h-4 w-4" />
				<span>Боја</span>
			</button>
			<button
				onclick={shareImage}
				class="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-900 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 sm:gap-2 sm:px-4 sm:py-2"
			>
				<Share2 class="h-4 w-4" />
				<span>Сподели</span>
			</button>
			<button
				onclick={onclose}
				class="rounded-full border border-slate-200 bg-white/80 p-2.5 text-slate-900 shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 sm:p-2"
				aria-label="Затвори"
			>
				<X class="h-5 w-5" />
			</button>
		</div>

		<div class="overflow-hidden rounded-3xl shadow-2xl sm:rounded-3xl">
			<div
				bind:this={cardRef}
				class="relative h-[80dvh] w-full overflow-hidden rounded-3xl p-6 sm:aspect-4/5 sm:h-auto sm:p-12 md:p-16 {currentTheme.gradient} flex flex-col items-center justify-between"
			>
				<div
					class="pointer-events-none absolute top-0 right-0 left-0 h-1/2 bg-linear-to-b from-slate-50/5 to-transparent"
				></div>

				<div
					class="relative z-10 flex min-h-0 w-full grow flex-col items-center justify-center overflow-hidden text-left"
				>
					<div
						class="shareable-poem prose max-h-full max-w-none overflow-hidden drop-shadow-sm {currentTheme.prose ||
							'prose-slate'} {currentTheme.dark
							? 'prose-invert'
							: ''} prose-base sm:prose-lg md:prose-xl prose-headings:mb-4 prose-headings:text-left prose-p:mb-4 prose-p:text-left prose-p:leading-relaxed"
					>
						{@html poemHtml}
					</div>
					<div
						class="absolute right-0 -bottom-1 left-0 h-32 bg-linear-to-t {currentTheme.fade}"
					></div>
				</div>

				<div
					class="relative z-10 text-center text-[10px] font-medium opacity-70 sm:text-xs {currentTheme.dark
						? 'text-slate-50'
						: 'text-slate-900'}"
				>
					Прочитај ја твојата дневна песна на <strong>poezija.dimeski.net</strong>
				</div>
			</div>
		</div>
	</div>
</div>
