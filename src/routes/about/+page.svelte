<script>
	import { fly } from 'svelte/transition';
	import img_rapanui from '$lib/images/rapanui.jpg';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="main-container">
	<div class="container">
		<img class="background" src={img_rapanui} alt="Nature" />
		<div class="text-column" in:fly="{{ x: 100, duration: 1000 }}">
			<h1 class="mision-title">Nuestra misión</h1>
			<p class="mision-description">
				OutdoorLife lo que busca es inspirar y facilitar la exploración de la naturaleza,
				ofreciendo a los usuarios panoramas completos de actividades al aire libre,
				recomendaciones de lugares, mapas detallados, consejos de seguridad y
				orientación sobre el equipamiento necesario. Con OutdoorLife,
				los amantes de la aventura pueden descubrir nuevos destinos,
				planificar sus excursiones de manera segura y equipada,
				y vivir experiencias enriquecedoras al aire libre.
			</p>
		</div>
	</div>
</div>

<style>
	.container {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	.text-column {
		flex: 1;
		display: flex;
		height: 100%;
		color: white;
		width: 70%;
		justify-content: center;
		align-items: left;
		flex-direction: column;
  }
	.background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
		height: 100%;
    object-fit: cover;
    z-index: -1;
  }
	.mision-title {
		font-size: 4em;
	}
	.mision-description {
		font-size: 1em;
		width: 80%;
		text-align: justify;
	}
</style>