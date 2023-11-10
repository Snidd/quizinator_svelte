<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Question } from '$lib/types/Question';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let question: Question;

	let submitting = false;

	const onSubmit: SubmitFunction = () => {
		submitting = true;

		return ({ update }) => {
			submitting = false;
			update();
		};
	};
</script>

<div class="p-4">
	<p class="p-2 mb-4 text-xl">
		{#if question.ingress}<span class="font-bold">{question.ingress}.</span>{/if}
		{question.text}
	</p>
	<ul class="grid grid-cols-2 grid-rows-2 gap-2">
		{#each question.answers as answer}
			<form method="POST" class="w-full" use:enhance={onSubmit}>
				<input type="hidden" name="answerId" value={answer.id} />
				<button
					type="submit"
					disabled={submitting}
					class="text-white disabled:text-gray-300 disabled:bg-gray-500 disabled:cursor-default disabled:hover:bg-gray-500 cursor-pointer w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-xl rounded-lg px-5 py-8 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
				>
					{answer.text}
				</button>
			</form>
		{/each}
	</ul>
</div>
