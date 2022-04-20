<script lang="ts">
export let content: string = '';
export let mode: 'success'| 'info'| 'warning' | 'danger';
</script>

<article class="message is-{mode}">
    <div class="message-header">
      <p>Danger</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      {content}
    </div>
  </article>