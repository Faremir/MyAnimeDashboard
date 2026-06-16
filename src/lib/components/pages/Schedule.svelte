<script lang="ts">
    import ScheduleEpisodeCard from '@lib/components/blocks/ScheduleEpisodeCard.svelte';
    import { scheduleRepository } from '@lib/repositories/scheduleRepository';
    import type { WatchStateAction } from '@lib/types/library';
    import type { NavigationItem } from '@lib/types/navigation';
    import type { ScheduledEpisode, ScheduleFilterStatus, WeekStartDay } from '@lib/types/schedule';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    // TODO: Replace with user setting once settings persistence exists.
    const weekStartsOn: WeekStartDay = 'monday';

    let filterStatus = $state<ScheduleFilterStatus>('all');
    let visibleWeekStart = $state(scheduleRepository.getWeekStart(new Date(), weekStartsOn));

    const scheduleDays = $derived(scheduleRepository.findWeek(visibleWeekStart, weekStartsOn, filterStatus));

    const currentWeekStart = $derived(scheduleRepository.getWeekStart(new Date(), weekStartsOn));
    const isViewingCurrentWeek = $derived(visibleWeekStart.getTime() === currentWeekStart.getTime());

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

    const formatWeekRange = (weekStart: Date): string => {
        const weekEnd = scheduleRepository.addWeeks(weekStart, 1);
        weekEnd.setDate(weekEnd.getDate() - 1);

        const formatter = new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
        });

        return `${formatter.format(weekStart)} – ${formatter.format(weekEnd)}`;
    };

    const showPreviousWeek = () => {
        visibleWeekStart = scheduleRepository.addWeeks(visibleWeekStart, -1);
    };

    const showCurrentWeek = () => {
        visibleWeekStart = currentWeekStart;
    };

    const showNextWeek = () => {
        visibleWeekStart = scheduleRepository.addWeeks(visibleWeekStart, 1);
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
        <div>
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Schedule</h1>
            <p>Mock weekly calendar for airing episodes and watch actions.</p>
        </div>

        <div class="week-controls" aria-label="Schedule week navigation">
            <button type="button" onclick={showPreviousWeek}>Previous week</button>
            <button type="button" disabled={isViewingCurrentWeek} onclick={showCurrentWeek}> Current week </button>
            <button type="button" onclick={showNextWeek}>Next week</button>
        </div>
    </header>

    <section class="schedule-toolbar" aria-label="Schedule filters">
        <div>
            <p class="week-label">Week</p>
            <p class="week-range">{formatWeekRange(visibleWeekStart)}</p>
        </div>

        <label>
            <span>Filter</span>
            <select bind:value={filterStatus}>
                <option value="all">All anime</option>
                <option value="watching">Watching</option>
                <option value="planned">Planned</option>
                <option value="paused">Paused</option>
                <option value="dropped">Dropped</option>
                <option value="completed">Completed</option>
                <option value="not-in-library">Not in library</option>
            </select>
        </label>
    </section>

    <div class="schedule-calendar" aria-label="Weekly anime schedule">
        {#each scheduleDays as day (day.date.toISOString())}
            <section class:current-day={scheduleRepository.isCurrentDay(day.date)} class="schedule-day">
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

    .page-header,
    .schedule-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        justify-content: space-between;
        gap: 16px;
    }

    .page-header h1,
    .page-header p,
    .week-label,
    .week-range {
        margin: 0;
    }

    .eyebrow,
    .page-header p,
    .schedule-day-header p,
    .empty-day,
    .week-label,
    .schedule-toolbar span {
        color: var(--color-text-muted);
    }

    .eyebrow {
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .week-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    .week-controls button,
    .schedule-toolbar select {
        padding: 8px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-panel);
    }

    .week-controls button {
        cursor: pointer;
    }

    .week-controls button:hover:not(:disabled) {
        border-color: var(--color-accent);
    }

    .week-controls button:disabled {
        cursor: not-allowed;
        opacity: 0.55;
    }

    .schedule-toolbar {
        padding: 14px;
        border: 1px solid var(--color-border);
        border-radius: 16px;
        background: var(--color-panel);
    }

    .week-label,
    .schedule-toolbar span {
        font-size: 12px;
    }

    .week-range {
        margin-top: 2px;
        font-size: 18px;
        font-weight: 700;
    }

    .schedule-toolbar label {
        display: flex;
        min-width: 180px;
        flex-direction: column;
        gap: 4px;
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

    .schedule-day.current-day {
        border-color: color-mix(in srgb, white 75%, var(--color-border));
        background: color-mix(in srgb, var(--color-accent) 8%, var(--color-background));
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
