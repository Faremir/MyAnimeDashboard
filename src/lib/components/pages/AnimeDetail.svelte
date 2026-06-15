<script lang="ts">
    import type {Anime, AnimeRelationType} from '@lib/types/anime';

    import {
        animeAgeRatingLabels,
        animeAiringStatusLabels,
        animeMediaTypeLabels,
        animeRelationTypeLabels,
        animeSeasonLabels,
        animeSourceLabels,
        formatLabel,
    } from '@lib/formatters/anime';

    type AnimeRelationView = {
        relationType: AnimeRelationType;
        anime: Anime;
    };

    type Props = {
        anime: Anime;
        relations?: AnimeRelationView[];
        onBack: () => void;
        onSelectAnime: (animeId: Anime['id']) => void;
    };

    let {anime, relations = [], onBack, onSelectAnime}: Props = $props();
</script>

<section class="anime-detail">
    <button class="back-button" type="button" onclick={onBack}>
        ← Back
    </button>

    <header class="detail-header">
        <div>
            <h1>{anime.title}</h1>

            {#if anime.titleEnglish}
                <p class="muted">{anime.titleEnglish}</p>
            {/if}

            {#if anime.titleJapanese}
                <p class="muted">{anime.titleJapanese}</p>
            {/if}
        </div>

        {#if anime.publicScore}
            <div class="score-card">
                <span class="score-label">Score</span>
                <strong>{anime.publicScore}</strong>
            </div>
        {/if}
    </header>

    {#if anime.synopsis}
        <p class="synopsis">{anime.synopsis}</p>
    {/if}

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
            <dt>Source</dt>
            <dd>{formatLabel(animeSourceLabels, anime.source)}</dd>
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
            <dt>Rating</dt>
            <dd>{formatLabel(animeAgeRatingLabels, anime.ageRating)}</dd>
        </div>

    </dl>

    {#if anime.genres.length > 0}
        <section class="detail-section">
            <h2>Genres</h2>

            <div class="tag-list">
                {#each anime.genres as genre}
                    <span>{genre}</span>
                {/each}
            </div>
        </section>
    {/if}

    {#if relations.length > 0}
        <section class="detail-section">
            <h2>Related Anime</h2>
            <div class="relation-list">
                {#each relations as relation}
                    <button class="relation-card" type="button" onclick={() => onSelectAnime(relation.anime.id)}>
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
        gap: 24px;
    }

    .back-button {
        align-self: flex-start;
    }

    .detail-header {
        display: flex;
        justify-content: space-between;
        gap: 24px;
    }

    .detail-header h1 {
        margin: 0;
    }

    .muted {
        color: var(--color-text-muted);
    }

    .score-card {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 12px 16px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        background: var(--color-panel);
    }

    .score-label {
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .synopsis {
        max-width: 900px;
        line-height: 1.6;
    }

    .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 12px;
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
        gap: 12px;
    }

    .detail-section h2 {
        margin: 0;
    }

    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .tag-list span {
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--color-panel);
        border: 1px solid var(--color-border);
    }

    .relation-list {
        display: grid;
        grid-auto-flow: column;
        gap: 12px;
    }

    .relation-card {
        appearance: none;
        font: inherit;
        display: flex;
        flex-direction: column;
        gap: 4px;
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