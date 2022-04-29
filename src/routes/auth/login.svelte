<script lang="ts" context="module">
	export type LoginPayload = {
		email: string;
		password: string;
	};
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { client } from '../../client';
	import { mutation, setClient } from '@urql/svelte';
	import Cookies from 'js-cookie';
	import { session } from '$app/stores';
	const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;

	setClient(client(token));
	const formData: LoginPayload = { email: '', password: '' };
	async function onSubmit() {
		const resp = await loginMutation({ email: formData.email, password: formData.password });
		console.log(resp.data.login);
		const { _id: id } = resp.data.login.data;
		const { secret, ttl } = resp.data.login;
		console.log({ id });
		console.log({ ttl });

		if (resp.data.login.data) {
			Cookies.set('VOLUNTEERS_TOKEN', JSON.stringify({ id, secret }), { expires: new Date(ttl) });
			session.set({
				id,
				secret
			});
			alert('login success');
			goto('/');
		}
		if (resp.error) {
			alert(resp.error);
		}
	}

	const loginMutation = mutation({
		query: `
        mutation ($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                secret
                ttl
                data {
                    _id
                }
            }
        }
        `
	});
</script>

<form class="box" on:submit|preventDefault={onSubmit}>
	<div class="field">
		<label for="email" class="label">Email</label>
		<div class="control has-icons-left">
			<input
				type="email"
				bind:value={formData.email}
				id="email"
				name="email"
				placeholder="e.g. bobsmith@gmail.com"
				class="input"
				required
			/>
			<span class="icon is-small is-left">
				<i class="fa fa-envelope" />
			</span>
		</div>
	</div>
	<div class="field">
		<label for="password" class="label">Password</label>
		<div class="control has-icons-left">
			<input
				type="password"
				bind:value={formData.password}
				name="password"
				id="password"
				placeholder="*******"
				class="input"
				required
			/>
			<span class="icon is-small is-left">
				<i class="fa fa-lock" />
			</span>
		</div>
	</div>
	<div class="field">
		<label for="" class="checkbox">
			<input type="checkbox" />
			Remember me
		</label>
	</div>
	<div class="field">
		<button class="button is-success" type="submit">let's go! </button>

		<button class="button is-info" on:click={() => goto('/auth/signup')}> Sigup </button>
	</div>
</form>
