<script lang="ts">
  import { mockLibraryListItems } from '@lib/mock/library';

  import type { NavigationItem } from '@lib/types/navigation';
  import type { LibraryStatus } from '@lib/types/library';

  type Props = {
      activeItem: NavigationItem;
  };

  let { activeItem }: Props = $props();

  const statusByNavigationId: Record<string, LibraryStatus | null> = {
      library: null,
      'library-watching': 'watching',
      'library-completed': 'completed',
      'library-planned': 'planned',
      'library-dropped': 'dropped',
      'library-paused': 'paused',
  };

  let selectedStatus = $derived(statusByNavigationId[activeItem.id] ?? null);

  let entries = $derived(
      selectedStatus
          ? mockLibraryListItems.filter((entry) => entry.status === selectedStatus)
          : mockLibraryListItems,
  );
</script>

<section class="library-page">
  <header class="page-header">
    <h1>Library</h1>
    <p>Selected view: {activeItem.label}</p>
  </header>

    {#if entries.length > 0}
    <div class="library-list">
      {#each entries as entry (entry.id)}
        <article class="library-entry">
          <div>
            <h2>{entry.anime.title}</h2>

              {#if entry.anime.titleEnglish}
              <p class="muted">{entry.anime.titleEnglish}</p>
            {/if}
          </div>

          <dl class="entry-meta">
            <div>
              <dt>Status</dt>
              <dd>{entry.status}</dd>
            </div>

            <div>
              <dt>Progress</dt>
              <dd>{entry.progress} / {entry.anime.episodes ?? '?'}</dd>
            </div>

              {#if entry.score}
              <div>
                <dt>Your score</dt>
                <dd>{entry.score}/10</dd>
              </div>
            {/if}

              {#if entry.anime.publicScore}
              <div>
                <dt>Public score</dt>
                <dd>{entry.anime.publicScore}</dd>
              </div>
            {/if}
          </dl>
        </article>
      {/each}
    </div>
  {:else}
    <p class="empty-state">No anime found for this library view.</p>
  {/if}
</section>

<style>
  .library-page {
      display: flex;
      flex-direction: column;
      gap: 24px;
  }

  .page-header {
      display: flex;
      flex-direction: column;
      gap: 4px;
  }

  .page-header h1 {
      margin: 0;
  }

  .muted,
  .page-header p,
  .empty-state {
      color: var(--color-text-muted);
  }

  .library-list {
      display: grid;
      gap: 12px;
  }

  .library-entry {
      display: flex;
      justify-content: space-between;
      gap: 24px;
      padding: 16px;
      border: 1px solid var(--color-border);
      border-radius: 12px;
      background: var(--color-panel);
  }

  .library-entry h2 {
      margin: 0;
      font-size: 18px;
  }

  .entry-meta {
      display: flex;
      gap: 16px;
      margin: 0;
  }

  .entry-meta div {
      min-width: 88px;
  }

  .entry-meta dt {
      color: var(--color-text-muted);
      font-size: 12px;
  }

  .entry-meta dd {
      margin: 0;
  }
</style>