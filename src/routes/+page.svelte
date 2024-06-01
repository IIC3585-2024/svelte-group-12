<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home" />
</svelte:head>

<script>
	import img_santiago from '$lib/images/santiago.jpg';
	import img_puerto_varas from '$lib/images/puerto_varas.jpg';
	import img_valparaiso from '$lib/images/valparaiso.jpg';
	import img_siete_tazas from '$lib/images/siete_tazas.jpg';
	import Caroussel from "./Components/Caroussel.svelte";

	const santiago = {
		image: img_santiago,
		city: "Santiago",
		location: "Parque Metropolitano"
	};

	const puerto_varas = {
		image: img_puerto_varas,
		city: "Puerto Varas",
		location: "Lago Llanquihue"
	};

	const valparaiso = {
		image: img_valparaiso,
		city: "Valparaíso",
		location: "Cerro Alegre"
	};

	const curico = {
		image: img_siete_tazas,
		city: "Curicó",
		location: "Siete Tazas"
	}
</script>

<Caroussel duration={5000} slides={[
	santiago,
	puerto_varas,
	valparaiso,
	curico
]}/>
