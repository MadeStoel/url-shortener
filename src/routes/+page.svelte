<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<section class="flex flex-col items-center justify-center h-full">
    <h1 class="h1 text-center mb-8">Url shortener</h1>

    <form class="w-1/2" method="POST" use:enhance>
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">https://</div>

            <input name="url" type="search" placeholder="Insert URL..." />

            <button class="variant-filled-secondary">Submit</button>
        </div>
    </form>
</section>