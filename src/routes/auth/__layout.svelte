<script lang="ts" context="module">
import { goto } from "$app/navigation";

	/** @type {import('./[slug]').Load} */
	export async function load({ params, fetch, session, stuff }) {
		console.log('[layout load]');
		if (session && session.id && session.secret) {
			console.log('redirected lo /');
			
			goto('/');
		}

		return {
			userId: session.id,
			secret: session.secret
		};
	}
</script>

<section class="hero is-primary is-fullheight-with-navbar">
	<div class="hero-body">
		<div class="container">
			<div class="columns is-centered">
				<div class="column is-5-tablet is-4-desktop is-3-widescreen">
					<slot />
				</div>
			</div>
		</div>
	</div>
</section>
