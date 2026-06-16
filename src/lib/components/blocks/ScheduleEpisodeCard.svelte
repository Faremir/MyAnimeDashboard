<script lang="ts">
    import WatchStateControls from '@lib/components/blocks/WatchStateControls.svelte';
    import type { WatchStateAction } from '@lib/types/library';
    import type { ScheduledEpisode } from '@lib/types/schedule';

    type Props = {
        episode: ScheduledEpisode;
        onOpenAnime: (episode: ScheduledEpisode) => void;
        onWatchStateAction: (episode: ScheduledEpisode, action: WatchStateAction) => void;
    };

    let { episode, onOpenAnime, onWatchStateAction }: Props = $props();

    const formatAirTime = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    let visualStatus = $derived(episode.libraryStatus ?? 'not-in-library');

    let canWatchEpisode = $derived(
        Boolean(episode.watchUrl) &&
            episode.libraryStatus !== 'completed' &&
            episode.libraryStatus !== 'dropped' &&
            episode.libraryStatus !== 'paused',
    );

    let cardClasses = $derived(
        [
            'schedule-episode-card',
            `state-${visualStatus}`,
            episode.libraryStatus === 'watching' ? 'is-actionable' : '',
            canWatchEpisode ? 'available' : 'unavailable',
        ]
            .filter(Boolean)
            .join(' '),
    );

    const handleOpenAnime = () => {
        onOpenAnime(episode);
    };
</script>

<article class={cardClasses}>
    <div class="episode-state-strip"></div>

    <div class="episode-details">
        <button
            aria-label={`Open details for ${episode.anime.title}`}
            class="card-open-button"
            onclick={handleOpenAnime}
            type="button">
        </button>

        <div class="episode-cover">
            {#if episode.anime.coverImage}
                <img src={episode.anime.coverImage} alt="" loading="lazy" />
            {:else}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg"
                    alt=""
                    loading="lazy" />
            {/if}
        </div>

        <div class="episode-metadata">
            <div class="episode-kicker">
                <p class="episode-time">{formatAirTime(episode.airDateTime)}</p>
                <p class="episode-number">Episode {episode.episodeNumber}</p>
            </div>
            <h3 class="episode-title">{episode.anime.title}</h3>
        </div>
    </div>

    <div class="episode-controls">
        <WatchStateControls onAction={(action) => onWatchStateAction(episode, action)} status={episode.libraryStatus} />
    </div>
</article>

<style>
    .schedule-episode-card {
        --episode-state-color: var(--state-not-in-library);
        --library-state-color: var(--state-not-in-library);
        position: relative;
        display: grid;
        gap: var(--space-1);
        height: 180px;
        grid-template-rows: 100px 52px;
        padding: var(--space-3);
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--library-state-color) 33%, var(--color-border));
        border-left: 0;
        border-radius: var(--radius-md);
        background:
            linear-gradient(240deg, color-mix(in srgb, var(--library-state-color) 10%, transparent), transparent 49%),
            var(--color-panel);
        box-shadow: 0 8px 20px rgb(0 0 0 / 14%);
        transition:
            border-color 120ms ease,
            background 120ms ease,
            opacity 120ms ease,
            filter 120ms ease,
            transform 120ms ease;
    }

    .schedule-episode-card:hover {
        transform: translateY(var(--neg-space-2));
    }

    .schedule-episode-card.unavailable {
        --episode-state-color: var(--color-danger);
    }

    .schedule-episode-card.available {
        --episode-state-color: var(--color-success);
    }

    .schedule-episode-card.state-watching {
        --library-state-color: var(--state-watching);
    }

    .schedule-episode-card.state-planned {
        --library-state-color: var(--state-planned);
    }

    .schedule-episode-card.state-paused {
        --library-state-color: var(--state-paused);
        opacity: 0.68;
    }

    .schedule-episode-card.state-dropped {
        --library-state-color: var(--state-dropped);
        opacity: 0.3;
        filter: grayscale(1);
    }

    .schedule-episode-card.state-completed {
        --library-state-color: var(--state-completed);
        opacity: 0.6;
        filter: grayscale(0.3);
    }

    .schedule-episode-card.state-not-in-library {
        --library-state-color: var(--state-not-in-library);
    }

    .episode-details {
        position: relative;
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        gap: 12px;
    }

    .card-open-button {
        position: absolute;
        inset: 0;
        z-index: 1;
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    .episode-state-strip {
        position: absolute;
        inset: 0 auto 0 0;
        width: 4px;
        background: var(--episode-state-color);
        opacity: 0.95;
    }

    .episode-details,
    .episode-cover,
    .episode-metadata,
    .card-open-button {
        height: 100px;
    }

    .episode-cover {
        position: relative;
        z-index: 2;
        width: 72px;
        overflow: hidden;
        border-radius: 8px;
        background: var(--color-panel-alt);
        pointer-events: none;
    }

    .episode-cover img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .episode-kicker {
        display: flex;
        gap: var(--space-2);
        font-size: 12px;
        font-weight: 750;
        height: 20px;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: center;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .episode-time {
        color: color-mix(in srgb, var(--library-state-color) 55%, var(--color-text-muted));
    }

    .episode-number {
        color: color-mix(in srgb, var(--library-state-color) 55%, var(--color-text-muted));
    }

    .episode-title {
        margin: var(--space-2) 0 0;
        font-size: 18px;
        line-height: 1.35;
        height: 70px;
        width: 100%;
        overflow: hidden;
        display: -webkit-box;
        color: var(--color-text);
        -webkit-box-orient: vertical;
    }

    .episode-state {
        color: var(--color-text-muted);
        font-size: 12px;
        margin: 0;
    }

    .episode-controls {
        position: relative;
        display: grid;
        gap: 12px;
        grid-auto-flow: column dense;
        justify-content: stretch;
        justify-items: stretch;
        align-content: space-around;
    }
</style>
