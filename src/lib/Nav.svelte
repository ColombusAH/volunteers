<script>
	let isMenuOpen = false;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
		</a>

		<a
			class:is-active={isMenuOpen}
			on:click={() => (isMenuOpen = !isMenuOpen)}
			role="button"
			class="navbar-burger"
			aria-label="menu"
			aria-expanded="false"
			data-target="navbarBasicExample"
		>
			<span aria-hidden="true" />
			<span aria-hidden="true" />
			<span aria-hidden="true" />
		</a>
	</div>

	<div id="navbarBasicExample" class="navbar-menu" class:is-active={isMenuOpen}>
		<div class="navbar-start">
			<a class="navbar-item"> Home </a>

			<a class="navbar-item"> About </a>

			<a class="navbar-item"> More </a>
		</div>

		<div class="navbar-end">
			<div class="navbar-item">
				<div class="buttons">
					<a class="button is-primary">
						<strong>Sign up</strong>
					</a>
					<a class="button is-light"> Log in </a>
				</div>
			</div>
		</div>
	</div>
</nav>
