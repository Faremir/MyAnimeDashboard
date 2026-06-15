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

    const handleOpenAnime = () => {
        onOpenAnime(episode);
    };

    const handleWatchEpisode = (event: MouseEvent) => {
        event.stopPropagation();
        onWatchEpisode(episode);
    };
</script>

<article class="schedule-episode-card">
    <div class="episode-details">
        <button
            aria-label={`Open details for ${episode.anime.title}`}
            class="card-open-button"
            onclick={handleOpenAnime}
            type="button"
        ></button>

        <div class="episode-cover">
            {#if episode.anime.coverImage}
                <img src={episode.anime.coverImage} alt="" loading="lazy" />
            {:else}
                <img
                    alt=""
                    loading="lazy"
                    src="https://upload.wikimedia.org/wikipedia/commons/9/9b/MyAnimeList_favicon.svg"
                />
            {/if}
        </div>

        <div class="episode-main">
            <p class="episode-time">{formatAirTime(episode.airDateTime)}</p>
            <p class="episode-number">Episode {episode.episodeNumber}</p>
            <h3>{episode.anime.title}</h3>
        </div>
    </div>

    {#if !episode.watchUrl}
        <span class="watch-unavailable">Episode is not currently available</span>
    {:else}
        <div></div>
    {/if}

    <div class="episode-controls">
        {#if episode.watchUrl}
            <button
                aria-label="Watch episode"
                title="Watch episode"
                type="button"
                class="watch-button"
                onclick={handleWatchEpisode}
                >▶
            </button>
        {/if}
        <WatchStateControls
            onAction={(action) => onWatchStateAction(episode, action)}
            status={episode.libraryStatus ?? 'planned'}
        />
    </div>
</article>

<style>
    .schedule-episode-card {
        position: relative;
        display: grid;
        padding: 12px;
        height: 180px;
        grid-template-rows: 100px 20px 40px;
        border: 1px solid var(--color-border);
        border-radius: 12px;
        background: var(--color-panel);
    }

    .episode-details {
        position: relative;
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr);
        gap: 12px;
        grid-auto-flow: column;
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

    .schedule-episode-card:hover {
        border-color: var(--color-accent);
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

    .episode-cover {
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

    .episode-main {
        min-width: 0;
        pointer-events: none;
        overflow: hidden;
    }

    .episode-time,
    .episode-number,
    .watch-unavailable {
        margin: 0;
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .episode-main h3 {
        margin: 4px 0;
        font-size: 15px;
        line-height: 1.25;
    }

    .episode-controls > button {
        padding: 6px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-background);
        cursor: pointer;
        width: 100%;
        height: fit-content;
    }

    .episode-controls > button:hover {
        border-color: var(--color-accent);
    }
</style>
