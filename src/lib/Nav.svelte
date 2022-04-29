<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
import { createEventDispatcher } from 'svelte';
	export let isMenuOpen = false;
	export let isUserloggedIn = false;
	export let activeRoute: '/' | '/gives' | '/about' | '/auth/signup' | '/auth/login' = '/';
	const dispatch = createEventDispatcher();

	$: if (browser) {
		goto(activeRoute);
		isMenuOpen = false;
	}
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="https://bulma.io">
			<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
		</a>
		<!-- svelte-ignore a11y-missing-attribute -->
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
			<a class="navbar-item" on:click={() => (activeRoute = '/')}> Home </a>

			<a class="navbar-item" on:click={() => (activeRoute = '/about')}> About </a>

			<a class="navbar-item" on:click={() => (activeRoute = '/gives')}> Gives </a>
		</div>
		<div class="navbar-end">
			
				<div class="navbar-item">
					<div class="buttons">
						{#if isUserloggedIn === false}
						<a class="button is-primary" on:click={() => (activeRoute = '/auth/signup')}>
							<strong>Sign up</strong>
						</a>
						<a class="button is-light" on:click={() => (activeRoute = '/auth/login')}> Log in </a>
						{:else}
						<a class="button is-light" on:click={() => dispatch('logout')}> Logout </a>
						{/if}
					</div>
				</div>
			
		</div>
	</div>
</nav>
