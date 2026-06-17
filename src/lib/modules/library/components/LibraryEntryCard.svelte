<script lang="ts">
    import Time from 'svelte-time';

    import { formatLabel, libraryStatusLabels } from '../library.formatters';
    import type { AnimeLibraryListItem, WatchStateAction } from '../library.types';
    import WatchStateControls from './WatchStateControls.svelte';

    type Props = {
        entry: AnimeLibraryListItem;
        onOpen: () => void;
        onWatchStateAction: (entry: AnimeLibraryListItem, action: WatchStateAction) => void;
    };

    let { entry, onOpen, onWatchStateAction }: Props = $props();

    let coverAlt = $derived(`${entry.anime.title} cover`);
    let titleEnglish = $derived(
        entry.anime.titleEnglish && entry.anime.titleEnglish !== entry.anime.title
            ? entry.anime.titleEnglish
            : undefined,
    );
    let episodeCount = $derived(entry.anime.episodes ?? '?');
</script>

<article class={`library-entry surface state-${entry.status}`}>
    <div class="library-entry-cover">
        {#if entry.anime.coverImage}
            <img src={entry.anime.coverImage} alt={coverAlt} loading="lazy" />
        {:else}
            <div class="library-entry-cover-placeholder" aria-hidden="true">MAD</div>
        {/if}
    </div>

    <div class="library-entry-content">
        <header class="library-entry-header">
            <p class="eyebrow">{formatLabel(libraryStatusLabels, entry.status)}</p>
            <h2>{entry.anime.title}</h2>

            {#if titleEnglish}
                <p class="muted">{titleEnglish}</p>
            {/if}
        </header>

        {#if entry.anime.genres.length > 0}
            <div class="tag-list" aria-label="Genres">
                {#each entry.anime.genres as genre (genre)}
                    <span class="tag">{genre}</span>
                {/each}
            </div>
        {/if}

        <dl class="library-entry-meta">
            <div>
                <dt>Progress</dt>
                <dd>{entry.progress} / {episodeCount}</dd>
            </div>

            {#if entry.score !== undefined}
                <div>
                    <dt>Your score</dt>
                    <dd>{entry.score}/10</dd>
                </div>
            {/if}

            <div>
                <dt>Added</dt>
                <dd>
                    <Time relative timestamp={entry.addedAt} />
                </dd>
            </div>

            <div>
                <dt>Updated</dt>
                <dd>
                    <Time relative timestamp={entry.updatedAt} />
                </dd>
            </div>
        </dl>
    </div>

    <div class="library-entry-actions">
        <button
            aria-label={`Open details for ${entry.anime.title}`}
            class="button library-entry-button"
            onclick={onOpen}
            type="button">
            Details
        </button>

        <div class="watch-state-controls">
            <WatchStateControls onAction={(action) => onWatchStateAction(entry, action)} status={entry.status} />
        </div>
    </div>
</article>

<style>
    .library-entry {
        display: grid;
        grid-template-columns: 96px minmax(0, 1fr) minmax(160px, auto);
        gap: var(--space-4);
        align-items: stretch;
        padding: var(--space-4);
        transition:
            border-color 120ms ease,
            background 120ms ease,
            transform 120ms ease;
    }

    .library-entry:hover {
        border-color: var(--color-border-strong);
        background: rgb(35 38 51 / 88%);
    }

    .library-entry:focus-within {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px var(--color-accent-muted);
    }

    .library-entry-cover {
        width: 96px;
        min-height: 136px;
        overflow: hidden;
        border-radius: var(--radius-md);
        background: var(--color-panel-alt);
    }

    .library-entry-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .library-entry-cover-placeholder {
        display: grid;
        width: 100%;
        height: 100%;
        min-height: 136px;
        place-items: center;
        color: var(--color-text-subtle);
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 0.12em;
    }

    .library-entry-content {
        display: flex;
        min-width: 0;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-4);
    }

    .library-entry-header {
        display: grid;
        gap: var(--space-1);
        min-width: 0;
    }

    .library-entry-header h2,
    .library-entry-header p {
        margin: 0;
    }

    .library-entry-header h2 {
        overflow: hidden;
        font-size: 18px;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .library-entry-meta {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
        gap: var(--space-3) var(--space-4);
        margin: 0;
    }

    .library-entry-meta dt {
        color: var(--color-text-muted);
        font-size: 12px;
        font-weight: 650;
    }

    .library-entry-meta dd {
        margin: 0;
        color: var(--color-text);
    }

    .library-entry-actions {
        display: flex;
        min-width: 160px;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-3);
    }

    .library-entry-button {
        width: 100%;
    }

    .watch-state-controls {
        display: grid;
        gap: var(--space-2);
    }

    @media (max-width: 800px) {
        .library-entry {
            grid-template-columns: 76px minmax(0, 1fr);
        }

        .library-entry-cover {
            width: 76px;
            min-height: 108px;
        }

        .library-entry-cover-placeholder {
            min-height: 108px;
        }

        .library-entry-actions {
            grid-column: 1 / -1;
            min-width: 0;
        }
    }
</style>
