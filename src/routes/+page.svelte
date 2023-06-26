<script lang="ts">
	import { enhance } from '$app/forms';
	import CopyToClipboardSvg from '$lib/assets/icons/copy-to-clipboard.svg';
	import type { ActionData, PageServerData } from './$types';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let form: ActionData;
	export let data: PageServerData;

	let urlElement: HTMLAnchorElement;

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom'
	};

	function copyToClipboard(): void {
		navigator.clipboard.writeText(urlElement.text);
	}
</script>

<section class="flex flex-col items-center mt-52 h-full">
	<h1 class="h1 text-center mb-8">Url shortener</h1>

	<form class="w-1/2 mb-4" method="POST" use:enhance>
		<div class="input-group input-group-divider grid-cols-[1fr_auto]">
			<input name="url" type="search" placeholder="Insert URL..." />

			<button class="variant-filled-secondary">Submit</button>
		</div>
	</form>

	{#if form?.shortUrl}
		<aside class="alert variant-ghost-success">
			<h3 class="h3">URL:</h3>

			<div class="alert-message">
				<a bind:this={urlElement} target="_blank" href={form.shortUrl}>{form.shortUrl}</a>
			</div>

			<div class="alert-actions">
				<img
					class="h-8 cursor-pointer"
					use:popup={popupClick}
					on:click={copyToClipboard}
					on:keyup={copyToClipboard}
					src={CopyToClipboardSvg}
					alt="Copy to clipboard"
				/>
			</div>

			<div class="card p-4 variant-filled-primary" data-popup="popupClick">
				<p>Copied to clipboard!</p>

				<div class="arrow variant-filled-primary" />
			</div>
		</aside>
	{/if}

	{#if form?.invalidUrl}
		<aside class="alert variant-ghost-error">
			<div class="alert-message">
				<p>Invalid URL! Only Https URLs are accepted.</p>
			</div>
		</aside>
	{/if}

	{#if data?.corruptUrl && !(form?.invalidUrl || form?.shortUrl)}
		<aside class="alert variant-ghost-error">
			<div class="alert-message">
				<p>
					The provided URL is no longer accessible. Why don't you make a new one while you're here?
				</p>
			</div>
		</aside>
	{/if}
</section>
