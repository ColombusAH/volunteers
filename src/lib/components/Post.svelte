<script lang="ts">
	import gettimeDiff from '$utils/time/elapsedTime.util';
	export let authorName: string = '';
	export let authorEmail: string = '';
  export let content = '';
	export let timestamp: number = 0;
	export let now: Date = new Date(Date.now());
	const postDate = new Date(timestamp);
	let timeAgoSentence = ``;
	$: {
		const { days, hours, minutes, seconds } = gettimeDiff(timestamp, now);

		if (days) {
			timeAgoSentence =
				days > 1
					? `${days} days ago at ${postDate.getHours()}:${postDate.getMinutes()}`
					: `yesterday at ${postDate.getHours()}:${postDate.getMinutes()}`;
		} else if (hours) {
			timeAgoSentence = hours > 1 ? `${hours} hours ` : `one hour`;
      timeAgoSentence+= minutes > 1 ? `and ${minutes} mintues ago`:`a minute ago`;
		}
    else if(minutes){
      timeAgoSentence = minutes > 1 ? `${minutes} minutes ago`:`a minute ago`;
    }
	}
</script>

<article class="media">
	<figure class="media-left">
		<p class="image is-64x64">
			<img src="https://bulma.io/images/placeholders/128x128.png" />
		</p>
	</figure>
	<div class="media-content">
		<div class="content">
			<p>
				<strong>{authorName}</strong> <small>{authorEmail}</small>
				<small>{timeAgoSentence}</small>
				<br />
				{content}
			</p>
		</div>
		<nav class="level is-mobile">
			<div class="level-left">
				<a class="level-item">
					<span class="icon is-small"><i class="fas fa-reply" /></span>
				</a>
				<a class="level-item">
					<span class="icon is-small"><i class="fas fa-retweet" /></span>
				</a>
				<a class="level-item">
					<span class="icon is-small"><i class="fas fa-heart" /></span>
				</a>
			</div>
		</nav>
	</div>
	<div class="media-right">
		<slot name="right-content" />
		<!-- <button class="delete" /> -->
	</div>
</article>
