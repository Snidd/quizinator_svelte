<script lang="ts">
	import type { Question } from '$lib/types/Question';

	export let question: Question;
</script>

<div class="p-4">
	<p class="p-2 mb-4 text-xl">
		<span class="font-bold">{question.ingress}.</span>
		{question.text}
	</p>
	<ul class="grid grid-cols-2 grid-rows-2 gap-2">
		{#each question.answers as answer}
			<li
				class="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl rounded-lg px-5 py-8 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
			>
				{answer.text}
			</li>
		{/each}
	</ul>
</div>
