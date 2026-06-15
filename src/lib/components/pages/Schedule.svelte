<script lang="ts">
    import ScheduleEpisodeCard from '@lib/components/blocks/ScheduleEpisodeCard.svelte';
    import { scheduleRepository } from '@lib/repositories/scheduleRepository';
    import type { WatchStateAction } from '@lib/types/library';
    import type { NavigationItem } from '@lib/types/navigation';
    import type { ScheduledEpisode } from '@lib/types/schedule';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const scheduleDays = scheduleRepository.findWeek();

    const formatDayName = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, {
            weekday: 'short',
        }).format(date);
    };

    const formatDayDate = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    const handleOpenAnime = (episode: ScheduledEpisode) => {
        console.info('Schedule anime selected:', {
            animeId: episode.anime.id,
            episodeId: episode.id,
        });
    };

    const handleWatchEpisode = (episode: ScheduledEpisode) => {
        console.info('Watch episode selected:', {
            animeId: episode.anime.id,
            episodeId: episode.id,
            watchUrl: episode.watchUrl,
        });
    };

    const handleWatchStateAction = (episode: ScheduledEpisode, action: WatchStateAction) => {
        console.info('Schedule watch state action selected:', {
            animeId: episode.anime.id,
            episodeId: episode.id,
            action,
        });
    };
</script>

<section class="schedule-page">
    <header class="page-header">
        <p class="eyebrow">{activeItem.label}</p>
        <h1>Schedule</h1>
        <p>Mock weekly calendar for airing episodes and watch actions.</p>
    </header>

    <div class="schedule-calendar" aria-label="Weekly anime schedule">
        {#each scheduleDays as day (day.date.toISOString())}
            <section class="schedule-day">
                <header class="schedule-day-header">
                    <h2>{formatDayName(day.date)}</h2>
                    <p>{formatDayDate(day.date)}</p>
                </header>

                {#if day.episodes.length > 0}
                    <div class="schedule-day-list">
                        {#each day.episodes as episode (episode.id)}
                            <ScheduleEpisodeCard
                                {episode}
                                onOpenAnime={handleOpenAnime}
                                onWatchEpisode={handleWatchEpisode}
                                onWatchStateAction={handleWatchStateAction}
                            />
                        {/each}
                    </div>
                {:else}
                    <p class="empty-day">No episodes</p>
                {/if}
            </section>
        {/each}
    </div>
</section>

<style>
    .schedule-page {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .page-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .page-header h1,
    .page-header p {
        margin: 0;
    }

    .eyebrow,
    .page-header p,
    .schedule-day-header p,
    .empty-day {
        color: var(--color-text-muted);
    }

    .eyebrow {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .schedule-calendar {
        display: grid;
        grid-template-columns: repeat(7, minmax(220px, 1fr));
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
    }

    .schedule-day {
        display: flex;
        min-width: 220px;
        flex-direction: column;
        gap: 12px;
        padding: 12px;
        border: 1px solid var(--color-border);
        border-radius: 16px;
        background: var(--color-background);
    }

    .schedule-day-header h2,
    .schedule-day-header p {
        margin: 0;
    }

    .schedule-day-header h2 {
        font-size: 16px;
    }

    .schedule-day-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .empty-day {
        margin: 0;
        font-size: 13px;
    }
</style>
