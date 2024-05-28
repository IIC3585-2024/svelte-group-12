<script>
	import { page } from '$app/stores';
</script>

<footer>
	<div>
		<ul>
			<li aria-current={$page.url.pathname === '/Home' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/topics') ? 'page' : undefined}>
				<a href="/topics">Topics</a>
			</li>
		</ul>
	</div>
</footer>

<style>
	footer {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		width: 100%;
		justify-content: center;
		background-color: rgb(231, 231, 231);
	}

	div {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	div a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
