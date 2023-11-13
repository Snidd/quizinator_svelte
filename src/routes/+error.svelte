<script>
	import { page } from '$app/stores';
</script>

<div class="h-screen flex flex-col items-center justify-center">
	<h1 class="text-4xl font-bold">{$page.status}</h1>
	<p class="italic">✈️ {$page.error?.message}</p>
</div>
