<script>
	import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
	<main class="flex-1">
		<slot />
	</main>
</div>

<style>
	:global(html) {
		box-sizing: border-box;
	}
</style>
