<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	export let data: PageData;

	const isPicked = (answer: string, picked: string): boolean => {
		return answer === picked;
	};
</script>

<div class="h-screen flex flex-col items-center justify-start">
	<h1 class="text-4xl font-bold">Klar!</h1>
	<p class="italic">Här är dina svar</p>
	<ul class="p-3 flex flex-col gap-2">
		{#each data.questions as question}
			<li>
				<p class="p-2 mb-4 text-xl">
					{#if question.ingress}<span class="font-bold">{question.ingress}.</span>{/if}
					{question.text}
				</p>
				<ul class="grid grid-cols-2 grid-rows-2 gap-2">
					{#each question.answers.split('|') as answer}
						{@const picked = isPicked(answer, question.picked_answer)}
						<div
							class="text-gray-300 break-words {picked
								? 'bg-blue-700 hover:bg-blue-700'
								: 'bg-gray-500 hover:bg-gray-500'} w-fullfocus:ring-4 font-medium text-xl rounded-lg px-5 py-8 mr-2 mb-2"
						>
							{answer}
						</div>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
