<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header>
	<div class="corner">
		<a href="https://github.com/IIC3585-2024/svelte-group-12">
			<img src={logo} alt="Source Code" />
		</a>
	</div>

	<div class="corner">
		<a href="https://github.com/IIC3585-2024/svelte-group-12">
			<img src={github} alt="Source Code" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
    background-color: var(--color-theme-2);
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
