<script lang="ts">
    import WatchStateControls from '@lib/components/blocks/WatchStateControls.svelte';
    import { formatLabel, libraryStatusLabels } from '@lib/formatters/library';
    import type { AnimeLibraryListItem, WatchStateAction } from '@lib/types/library';
    import Time from 'svelte-time';

    type Props = {
        entry: AnimeLibraryListItem;
        onOpen: () => void;
        onWatchStateAction: (entry: AnimeLibraryListItem, action: WatchStateAction) => void;
    };
    let { entry, onOpen, onWatchStateAction }: Props = $props();
</script>

<article class="library-entry">
    <div class="library-entry-column">
        <div class="library-entry-row library-entry-cover">
            {#if entry.anime.coverImage}
                <img src={entry.anime.coverImage} alt="" loading="lazy" />
            {:else}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg"
                    alt=""
                    loading="lazy"
                />
            {/if}
        </div>
    </div>

    <div class="library-entry-column">
        <div class="library-entry-column library-entry-info">
            <h2>{entry.anime.title}</h2>

            <p class="muted">{entry.anime.titleEnglish}</p>

            {#if entry.anime.genres.length > 0}
                <div class="tag-list">
                    {#each entry.anime.genres as genre (genre)}
                        <span>{genre}</span>
                    {/each}
                </div>
            {/if}
        </div>
        <dl class="library-entry-row library-entry-meta">
            <div>
                <dt>Status</dt>
                <dd>{formatLabel(libraryStatusLabels, entry.status)}</dd>
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
    <div class="library-entry-column">
        <div class="library-entry-row">
            <button
                aria-label={`Open details for ${entry.anime.title}`}
                class="library-entry-button"
                onclick={onOpen}
                type="button">Details</button
            >
        </div>
        <div class="library-entry-row watch-state-controls">
            <WatchStateControls onAction={(action) => onWatchStateAction(entry, action)} status={entry.status} />
        </div>
    </div>
</article>

<style>
    .library-entry {
        position: relative;
        gap: 16px;
        width: 100%;
        height: 220px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        color: inherit;
        text-align: left;
        background: var(--color-panel);
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: minmax(0, 150px) auto 20% 5px;
        justify-items: stretch;
        align-content: stretch;
        align-items: stretch;
    }

    .library-entry-column {
        position: relative;
        align-items: center;
        display: grid;
        grid-auto-flow: row;
    }

    .library-entry-row {
        position: relative;
        display: grid;
        grid-auto-flow: column;
        align-items: center;
        gap: 16px;
        width: 100%;
    }

    .library-entry-button {
        padding: 6px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-background);
        cursor: pointer;
    }

    .library-entry:hover {
        border-color: var(--color-accent);
    }

    .library-entry:has(.library-entry-button:focus-visible) {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }

    .library-entry-cover {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 8px;
        background: var(--color-panel-alt);
        pointer-events: none;
    }

    .library-entry-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .library-entry-info {
        position: relative;
        z-index: 2;
        pointer-events: none;
    }

    .library-entry h2 {
        margin: 0;
        font-size: 18px;
    }

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    .tag-list span {
        padding: 3px 8px;
        border: 1px solid var(--color-border);
        border-radius: 999px;
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .library-entry-meta {
        display: flex;
        flex-shrink: 0;
        gap: 16px;
        margin: 0;
    }
    .library-entry-meta div {
        min-width: 88px;
    }

    .library-entry-meta dt {
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .library-entry-meta dd {
        margin: 0;
    }

    .watch-state-controls {
        position: relative;
        z-index: 3;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        pointer-events: auto;
    }

    .muted {
        color: var(--color-text-muted);
    }
</style>
