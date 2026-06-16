<script lang="ts">
    import WatchStateControls from '@lib/components/blocks/WatchStateControls.svelte';
    import type { WatchStateAction } from '@lib/types/library';
    import type { ScheduledEpisode } from '@lib/types/schedule';

    type Props = {
        episode: ScheduledEpisode;
        onOpenAnime: (episode: ScheduledEpisode) => void;
        onWatchEpisode: (episode: ScheduledEpisode) => void;
        onWatchStateAction: (episode: ScheduledEpisode, action: WatchStateAction) => void;
    };

    let { episode, onOpenAnime, onWatchEpisode, onWatchStateAction }: Props = $props();

    const formatAirTime = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const cardClasses = $derived(
        ['schedule-episode-card', episode.libraryStatus !== undefined ? episode.libraryStatus : 'not-in-library']
            .filter(Boolean)
            .join(' '),
    );

    const canWatchEpisode = $derived(Boolean(episode.watchUrl));

    const handleOpenAnime = () => {
        onOpenAnime(episode);
    };

    const handleWatchEpisode = (event: MouseEvent) => {
        event.stopPropagation();

        if (!canWatchEpisode) {
            return;
        }

        onWatchEpisode(episode);
    };
</script>

<article class={cardClasses}>
    <div class="episode-details">
        {#if canWatchEpisode}
            <button
                aria-label="Watch episode"
                class="card-open-button"
                onclick={handleWatchEpisode}
                title="Watch episode"
                type="button"
            ></button>
        {:else}
            <button
                aria-label={`Open details for ${episode.anime.title}`}
                class="card-open-button"
                onclick={handleOpenAnime}
                type="button"
            ></button>
        {/if}

        <div class="episode-cover">
            {#if episode.anime.coverImage}
                <img src={episode.anime.coverImage} alt="" loading="lazy" />
            {:else}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg"
                    alt=""
                    loading="lazy"
                />
            {/if}
        </div>

        <div class="episode-metadata">
            <p class="episode-time">{formatAirTime(episode.airDateTime)}</p>
            <h3 class="episode-title">{episode.anime.title}</h3>
            <p class="episode-number">Episode {episode.episodeNumber}</p>
        </div>
    </div>

    <div class="episode-state">
        {#if !episode.watchUrl}
            <span class="watch-unavailable">Episode is not currently available</span>
        {/if}
    </div>

    <div class="episode-controls">
        {#if episode.libraryStatus && episode.libraryStatus !== 'completed'}
            <WatchStateControls
                onAction={(action) => onWatchStateAction(episode, action)}
                status={episode.libraryStatus}
            />
        {/if}
    </div>
</article>

<style>
    :root {
        --color-watching: green;
        --color-completed: white;
        --color-planned: turquoise;
        --color-dropped: red;
        --color-paused: orange;
        --color-not-in-library: blue;
    }

    /* Cards */
    .schedule-episode-card {
        position: relative;
        display: grid;
        height: 180px;
        grid-template-rows: 100px 20px 40px;
        padding: 12px;
        border-radius: 12px;
        background: var(--color-panel);
        transition:
            border-color 120ms ease,
            opacity 120ms ease,
            filter 120ms ease,
            background 120ms ease;
    }

    .schedule-episode-card.watching {
        border-color: color-mix(in srgb, var(--color-accent) 70%, var(--color-border));
        background: color-mix(in srgb, var(--color-accent) 12%, var(--color-panel));
        border: 1px solid var(--color-not-in-library);
    }

    .schedule-episode-card.paused {
        opacity: 0.6;
        border: 1px solid var(--color-paused);
    }

    .schedule-episode-card.dropped {
        opacity: 0.38;
        filter: grayscale(0.9);
        border: 1px solid var(--color-dropped);
    }

    .schedule-episode-card.completed {
        opacity: 0.33;
        filter: grayscale(0.7);
        border: 1px solid var(--color-completed);
    }

    .schedule-episode-card.not-in-library {
        opacity: 0.72;
        border: 1px solid var(--color-not-in-library);
    }

    .schedule-episode-card:hover {
        border: 1px solid greenyellow;
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
        border-radius: inherit;
        background: transparent;
        cursor: pointer;
    }

    /* Cover */
    .episode-cover {
        position: relative;
        z-index: 2;
        width: 72px;
        height: 96px;
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

    .episode-metadata {
        min-width: 0;
        overflow: hidden;
        pointer-events: none;
    }

    .episode-time,
    .episode-number,
    .episode-state {
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .episode-time,
    .episode-number,
    .episode-title,
    .episode-state {
        margin: 0;
    }

    .episode-title {
        margin-top: 4px;
        font-size: 15px;
        line-height: 1.25;
        max-height: 60px;
        overflow: hidden;
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
