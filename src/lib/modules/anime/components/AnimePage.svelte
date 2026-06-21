<script lang="ts">
    import Time from 'svelte-time';

    import { animeActions } from '../anime.actions';
    import {
        animeAiringStatusLabels,
        animeMediaTypeLabels,
        animeRelationTypeLabels,
        animeSeasonLabels,
        formatLabel,
    } from '../anime.formatters';
    import type { Anime, AnimeRelationView } from '../anime.types';

    type Props = {
        anime: Anime;
        relations?: AnimeRelationView[];
    };

    let { anime, relations = [] }: Props = $props();
</script>

<section class="anime-detail">
    <button class="button back-button" onclick={() => animeActions.closeAnimePage()} type="button">← Back</button>

    {#if anime.coverImage}
        <div class="detail-banner">
            <img src={anime.coverImage} alt="" />
        </div>
    {/if}

    <header class="detail-header">
        <div>
            <h1>{anime.title}</h1>

            {#if anime.titleEnglish}
                <p class="muted">{anime.titleEnglish}</p>
            {/if}

            {#if anime.titleNative}
                <p class="muted">{anime.titleNative}</p>
            {/if}
        </div>
    </header>

    <dl class="info-grid">
        <div>
            <dt>Type</dt>
            <dd>{formatLabel(animeMediaTypeLabels, anime.mediaType)}</dd>
        </div>

        <div>
            <dt>Episodes</dt>
            <dd>{anime.episodes ?? '?'}</dd>
        </div>

        <div>
            <dt>Status</dt>
            <dd>{formatLabel(animeAiringStatusLabels, anime.airingStatus)}</dd>
        </div>

        <div>
            <dt>Season</dt>
            <dd>
                {#if anime.season}
                    {formatLabel(animeSeasonLabels, anime.season)}
                {:else}
                    ?
                {/if}
            </dd>
        </div>

        <div>
            <dt>Release Date</dt>
            <dd>
                {#if anime.releaseDate}
                    <Time timestamp={anime.releaseDate} />
                {:else}
                    ?
                {/if}
            </dd>
        </div>

        <div>
            <dt>Rating</dt>
            <dd>{anime.isAdult ? 'Adult content' : 'General listing'}</dd>
        </div>
    </dl>

    {#if relations.length > 0}
        <section class="detail-section">
            <h2>Related Anime</h2>
            <div class="relation-list">
                {#each relations as relation (relation.anime.id)}
                    <button
                        class="relation-card"
                        type="button"
                        onclick={() => animeActions.openAnimePage(relation.anime.id)}>
                        <span class="muted">{formatLabel(animeRelationTypeLabels, relation.relationType)}</span>
                        <strong>{relation.anime.title}</strong>
                    </button>
                {/each}
            </div>
        </section>
    {/if}
</section>

<style>
    .anime-detail {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
    }

    .back-button {
        align-self: flex-start;
    }

    .detail-banner {
        height: 220px;
        overflow: hidden;
        border-radius: 16px;
        border: 1px solid var(--color-border);
        background: var(--color-panel);
    }

    .detail-banner img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .detail-header {
        display: flex;
        justify-content: space-between;
        gap: var(--space-6);
    }

    .detail-header h1 {
        margin: 0;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: var(--space-3);
        margin: 0;
    }

    .info-grid div,
    .relation-card {
        padding: 12px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        background: var(--color-panel);
    }

    dt {
        color: var(--color-text-muted);
        font-size: 12px;
    }

    dd {
        margin: 0;
    }

    .detail-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
    }

    .detail-section h2 {
        margin: 0;
    }

    .relation-list {
        display: grid;
        grid-auto-flow: column;
        gap: var(--space-3);
    }

    .relation-card {
        appearance: none;
        font: inherit;
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
        color: inherit;
        text-align: left;
        cursor: pointer;
    }

    .relation-card:hover {
        border-color: var(--color-accent);
    }

    .relation-card:focus-visible {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }
</style>
