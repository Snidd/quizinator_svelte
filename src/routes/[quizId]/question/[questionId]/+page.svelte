<script lang="ts">
	import ShowQuestion from '$lib/components/ShowQuestion.svelte';
	import type { Question } from '$lib/types/Question';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<ShowQuestion question={data} />
