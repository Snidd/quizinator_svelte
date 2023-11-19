<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-6">
	<p class="text-4xl font-bold">Resultat</p>
	<div class="mt-4 grid grid-cols-2 gap-2 w-60">
		{#each data.results as result}
			<p>{result.name}</p>
			<p>{result.correct_answers}</p>
		{/each}
	</div>
</div>
