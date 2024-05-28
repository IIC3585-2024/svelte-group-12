<script>
	import Footer from './Components/Footer.svelte';
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		width: 100%;
	}
</style>
