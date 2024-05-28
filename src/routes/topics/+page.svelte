<svelte:head>
	<title>Topics</title>
	<meta name="description" content="Topics" />
</svelte:head>

<script>
	import { fade, scale } from 'svelte/transition';
  import { writable } from 'svelte/store';

  let images = [
    { src: 'https://picsum.photos/200/300', alt: 'Sunset in the mountains', category: 'Foro' },
    { src: 'https://picsum.photos/200/301', alt: 'Sunset in the mountains', category: 'Ciudades' },
    { src: 'https://picsum.photos/200/302', alt: 'Sunset in the mountains', category: 'Your title here' },
    { src: 'https://picsum.photos/200/303', alt: 'Sunset in the mountains', category: 'Your title here' },
    { src: 'https://picsum.photos/200/304', alt: 'Sunset in the mountains', category: 'Your title here' },
    { src: 'https://picsum.photos/200/305', alt: 'Sunset in the mountains', category: 'Your title here' }
  ];

  let isHovered = writable(Array(images.length).fill(false));
</script>

<div class="topics-container">
	<div class="topics-description">
		<div class="horizontal-line" in:scale={{ duration: 1000 }}></div>
		<div class="topics-title" in:fade="{{ duration: 1000 }}">
			<h1>Explora nuestro contenido</h1>
			<p>estos son los principales temas de interés</p>
		</div>
		<div class="horizontal-line" in:scale={{ duration: 1000 }}></div>
	</div>
	<div class="grid">
		{#each images as image, i}
			<a href={`/blogs`}>
				<div role="button" tabindex="0" class="relative rounded overflow-hidden shadow-lg" style="max-width: 12em; max-height: 13em"
					on:mouseenter={() => $isHovered[i] = true} 
					on:focus={() => $isHovered[i] = true}
					on:mouseleave={() => $isHovered[i] = false}
					on:blur={() => $isHovered[i] = false}
					class:opacity-50={$isHovered[i]}
					class:opacity-100={!$isHovered[i]}
				>
					<img class="w-full h-full transition-all duration-500" src={image.src} alt={image.alt}>
						<div class="absolute inset-0 flex items-center justify-center transition-all duration-500"
								class:opacity-100={$isHovered[i]}
								class:opacity-0={!$isHovered[i]}>
							<p class="text-white text-sm bg-black p-4">{image.category}</p>
						</div>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.horizontal-line {
    border-top: 1px solid #000;
    width: 50%;
  }
	.topics-description {
		display: flex;
		align-items: center;
		padding: 30px 0;
		width: 60%;
	}
	.topics-title {
    display: flex;
		flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
		padding: 20px;
		width: 100%;
  }
	.topics-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 40px;
		padding: 40px;
		margin-bottom: 5%;
	}
</style>
