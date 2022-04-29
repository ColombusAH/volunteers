<script lang="ts" context="module">
	import type { LoginPayload } from './Login.svelte';

	interface SignupPayload extends LoginPayload {
		// username: string;
		confirmPassword: string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { mutation, setClient } from '@urql/svelte';
    import { client } from '../../client';

	const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;
	setClient(client(token));

	const formData: SignupPayload = { email: '', password: '', confirmPassword: '' };
	async function onSubmit() {
		const resp = await registerMutation({
			email: formData.email,
			password: formData.password
		});

		if (resp.data.register) {
			goto('/');
		}
		if (resp.error) {
			alert(resp.error);
		}
	}

	const registerMutation = mutation({
		query: `mutation ($email: String!, $password: String!) { 
            register(email: $email, password: $password) {
                _id
            }
        }`
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
		<label for="" class="label">confirm Password</label>
		<div class="control has-icons-left">
			<input
				type="password"
				bind:value={formData['confirmPassword']}
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
		<button class="button is-success" type="submit">let's go! </button>

		<button class="button is-info" on:click={() => goto('/auth/login')}> have an account? </button>
	</div>
</form>
