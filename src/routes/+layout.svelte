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
		min-height: 100vh;
	}
</style>
