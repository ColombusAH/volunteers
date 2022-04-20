import { createClient } from '@urql/svelte';

export const getCreateClient = (token: string) =>
	createClient({
		url: 'https://graphql.eu.fauna.com/graphql',
		fetchOptions: () => {
			return {
				headers: { authorization: token ? `Bearer ${token}` : '' }
			};
		}
	});
