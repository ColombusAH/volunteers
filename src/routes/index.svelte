<script lang="ts">
	import { onMount } from 'svelte';
	import { operationStore, query, setClient } from '@urql/svelte';
	import { client } from '../client';
	import SystemMessageCompo from '$lib/components/systemMessage.svelte';
	import Post from '$lib/components/Post.svelte';
	const token = import.meta.env.VITE_PUBLIC_FAUNA_KEY;

	setClient(client(token));

	const allPosts = operationStore(
		`query GetAllPosts($size: Int!, $cursor: String) {
        listsPosts(_size: $size, _cursor: $cursor) {
            data {
                _id
                title
				content
                _ts
                author {
                    email
                }
            }
        }
    }`,
		{ size: 100 },
		{ requestPolicy: 'network-only' }
	);
	let time: Date = new Date();
	query(allPosts);

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 3000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

{#if $allPosts.fetching}
	<progress class="progress is-large is-info" max="100">60%</progress>
{:else if $allPosts.error}
	<SystemMessageCompo mode={'danger'} content={$allPosts.error.message} />
{:else}
	{#each $allPosts.data.listsPosts.data as post}
		<Post
			authorEmail={post.author.email}
			content={post.content}
			timestamp={post._ts / 1000}
			now={time}
		/>
	{/each}
{/if}
