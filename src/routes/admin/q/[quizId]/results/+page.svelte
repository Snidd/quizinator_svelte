<script lang="ts">
	import type { PageData } from './$types';
	import type { ResultDb } from './+page.server';

	export let data: PageData;

	let currentWinner: ResultDb | undefined = undefined;

	const updateWinner = (result: ResultDb) => {
		if (currentWinner == null) {
			currentWinner = result;
			return;
		}

		if (+result.correct_count > +currentWinner.correct_count) {
			currentWinner = result;
		}
	};
</script>

<div class="p-6">
	<p class="text-4xl font-bold">Resultat</p>
	<div class="mt-4 grid grid-cols-2 gap-2 w-60">
		{#each data.results as result}
			{@const winner = updateWinner(result)}
			<p>{result.name}</p>
			<p>{result.correct_count}/{result.total_count}</p>
		{/each}
	</div>
	<p class="text-2xl pt-6">
		Nuvarande vinnare: <span class="font-bold"
			>{currentWinner?.name} - {currentWinner?.correct_count}</span
		>
	</p>
</div>
