<script lang="ts">
    import {formatLabel, libraryStatusLabels,} from '@lib/formatters/library';
    import type {AnimeLibraryListItem} from "@lib/types/library";

    type Props = {
        entry: AnimeLibraryListItem;
        onOpen: () => void;
    };
    let {entry, onOpen}: Props = $props();
</script>

<article class="library-entry">
    <button class="library-entry-button" type="button" aria-label={`Open details for ${entry.anime.title}`} onclick={onOpen}></button>
    <div class="entry-cover">
        {#if entry.anime.coverImage}
            <img src={entry.anime.coverImage} alt="" loading="lazy"/>
        {:else}
            <div class="entry-cover-placeholder">{entry.anime.title.slice(0, 1)}</div>
        {/if}
    </div>
    <div class="entry-main">
        <h2>{entry.anime.title}</h2>

        {#if entry.anime.titleEnglish}
            <p class="muted">{entry.anime.titleEnglish}</p>
        {/if}

        {#if entry.anime.genres.length > 0}
            <div class="tag-list">
                {#each entry.anime.genres as genre}
                    <span>{genre}</span>
                {/each}
            </div>
        {/if}
    </div>

    <dl class="entry-meta">
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

        {#if entry.anime.publicScore}
            <div>
                <dt>Public score</dt>
                <dd>{entry.anime.publicScore}</dd>
            </div>
        {/if}
    </dl>
</article>

<style>
    .library-entry {
        position: relative;
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
        width: 100%;
        padding: 16px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        color: inherit;
        text-align: left;
        background: var(--color-panel);
    }

    .library-entry-button {
        position: absolute;
        inset: 0;
        z-index: 1;
        border: 0;
        padding: 0;
        border-radius: inherit;
        background: transparent;
        cursor: pointer;
    }

    .library-entry:hover {
        border-color: var(--color-accent);
    }

    .library-entry:has(.library-entry-button:focus-visible) {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }

    .entry-cover {
        position: relative;
        z-index: 2;
        width: 72px;
        height: 96px;
        overflow: hidden;
        border-radius: 8px;
        background: var(--color-panel-alt);
        pointer-events: none;
    }

    .entry-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .entry-cover-placeholder {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
        color: var(--color-text-muted);
        font-size: 28px;
        font-weight: 700;
    }


    .entry-main,
    .entry-meta {
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

    .entry-meta {
        display: flex;
        flex-shrink: 0;
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

    .muted {
        color: var(--color-text-muted);
    }
</style>