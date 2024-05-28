<script>
	import img_santiago from '$lib/images/santiago.jpg';
	import img_puerto_varas from '$lib/images/puerto_varas.jpg';
	import img_valparaiso from '$lib/images/valparaiso.jpg';
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
</script>

<div>
	<Caroussel duration={5000} slides={[
		santiago,
		puerto_varas,
		valparaiso
	]}/>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
</style>