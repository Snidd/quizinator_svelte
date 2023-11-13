<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="p-4">
	<h1 class="text-2xl font-bold pb-4">{data.quiz.description}</h1>
	<ul class="flex flex-col gap-2 mb-4">
		{#each data.quiz.questions as question}
			<li>
				{#if question.ingress}<span class="font-bold pr-1">{question.ingress}.</span
					>{/if}{question.text}
			</li>
		{/each}
	</ul>
	<form
		class="grid border border-blue-900 rounded-xl p-4 gap-6 mb-2 md:grid-cols-2 pt-2"
		method="post"
		use:enhance
	>
		<input type="hidden" value="50" name="order" />
		<div class="mb-0 col-span-2">
			<label for="ingress" class="block mb-2 text-sm font-medium text-gray-900">Ingress</label>
			<input
				type="text"
				id="ingress"
				name="ingress"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="Inrikes"
				required
			/>
		</div>
		<div class="mb-6 col-span-2">
			<label for="text" class="block mb-2 text-sm font-medium text-gray-900">Text</label>
			<textarea
				id="text"
				name="text"
				rows="4"
				required
				class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
				placeholder="Write your question here..."
			/>
		</div>
		<div>
			<label for="answer_1" class="block mb-2 text-sm font-medium text-gray-900"
				>Answer 1 (correct)</label
			>
			<input
				type="text"
				name="answer_1"
				id="answer_1"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="First answer"
				required
			/>
		</div>
		<div>
			<label for="answer_2" class="block mb-2 text-sm font-medium text-gray-900">Answer 2</label>
			<input
				type="text"
				name="answer_2"
				id="answer_2"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="Second answer"
				required
			/>
		</div>
		<div>
			<label for="answer_3" class="block mb-2 text-sm font-medium text-gray-900">Answer 3</label>
			<input
				type="text"
				name="answer_3"
				id="answer_3"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="Third answer"
				required
			/>
		</div>
		<div>
			<label for="answer_4" class="block mb-2 text-sm font-medium text-gray-900">Answer 4</label>
			<input
				type="text"
				name="answer_4"
				id="answer_4"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder="Fourth answer"
				required
			/>
		</div>
		<div>
			<button
				type="submit"
				class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
			>
				Publish Question
			</button>
		</div>
	</form>
</div>
