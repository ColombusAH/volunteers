<script lang="ts">
	import '../app.scss';
	import Nav from '$lib/Nav.svelte';
	import { session } from '$app/stores';
	import { derived } from 'svelte/store';
	import { goto } from '$app/navigation';
	session.subscribe((se) => console.log(se));
	const isUserloggedIn = derived(session, ($session) => !!$session.id);
	function logout() {
		session.set({ id: null, secret: null });
		goto('/auth/login');
	}
</script>

<div class="container is-fullheight">
	<Nav isUserloggedIn={$isUserloggedIn} on:logout={logout} />
	<slot />
</div>
