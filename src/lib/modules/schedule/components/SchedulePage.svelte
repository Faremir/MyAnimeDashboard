<script lang="ts">
    import type { NavigationItem } from '@lib/modules/navigation';
    import { addWeeks, getDateString, isSameDay } from '@lib/shared/utils/date';

    import { scheduleRepository } from '../schedule.repository';
    import type { DayScheduleView, ScheduleFilterStatus } from '../schedule.types';
    import ScheduleEpisodeCard from './ScheduleEpisodeCard.svelte';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const currentDate = new Date();
    const currentScheduleWeek = scheduleRepository.findScheduleWeek({ date: currentDate });

    let filterStatus = $state<ScheduleFilterStatus>('all');
    let visibleDate = $state(currentDate);
    let selectedDayKey = $state('');

    let scheduleWeek = $derived(
        scheduleRepository.findScheduleWeek({
            date: visibleDate,
            filterStatus,
        }),
    );

    let scheduleDays = $derived(scheduleWeek.days);
    let weekEpisodeCount = $derived(scheduleWeek.episodeCount);

    let isViewingCurrentWeek = $derived(scheduleWeek.startDate.getTime() === currentScheduleWeek.startDate.getTime());

    let selectedDay = $derived(
        scheduleDays.find((day) => getDateString(day.date) === selectedDayKey) ?? scheduleDays[0],
    );

    $effect(() => {
        const selectedDayExists = scheduleDays.some((day) => getDateString(day.date) === selectedDayKey);

        if (selectedDayExists) {
            return;
        }

        const currentDayInWeek = scheduleDays.find((day) => isSameDay(day.date, currentDate));
        selectedDayKey = getDateString(currentDayInWeek?.date ?? scheduleDays[0].date);
    });

    const formatDayName = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date);
    };

    const formatFullDayName = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(date);
    };

    const formatDayDate = (date: Date): string => {
        return new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    const formatWeekRange = (startDate: Date, endDate: Date): string => {
        const formatter = new Intl.DateTimeFormat(undefined, {
            month: 'short',
            day: 'numeric',
        });

        return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
    };

    const selectDay = (day: DayScheduleView): void => {
        selectedDayKey = getDateString(day.date);
    };

    const showPreviousWeek = (): void => {
        visibleDate = addWeeks(scheduleWeek.startDate, -1);
        selectedDayKey = '';
    };

    const showCurrentWeek = (): void => {
        visibleDate = currentDate;
        selectedDayKey = '';
    };
</script>

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Schedule</h1>
            <p class="muted">Weekly airing episodes, watch links, and library-state actions.</p>
        </div>

        <div aria-label="Schedule week navigation" class="week-controls">
            <button class="button" onclick={showPreviousWeek} type="button">Previous</button>
            <button class="button" disabled={isViewingCurrentWeek} onclick={showCurrentWeek} type="button">
                Current
            </button>
        </div>
    </header>

    <section aria-label="Schedule filters" class="toolbar">
        <div class="week-summary">
            <span>Week</span>
            <strong>{formatWeekRange(scheduleWeek.startDate, scheduleWeek.endDate)}</strong>
            <p>{weekEpisodeCount} episode{weekEpisodeCount === 1 ? '' : 's'}</p>
        </div>

        <label class="form-field">
            <span class="form-label">Filter</span>
            <select bind:value={filterStatus} class="select">
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

    <nav aria-label="Schedule days" class="day-tabs">
        {#each scheduleDays as day (getDateString(day.date))}
            <button
                class:current-day={isSameDay(day.date, currentDate)}
                class:selected={getDateString(day.date) === selectedDayKey}
                type="button"
                onclick={() => selectDay(day)}>
                <span>{formatDayName(day.date)}</span>
                <strong>{formatDayDate(day.date)}</strong>

                {#if day.episodes.length > 0}
                    <small>{day.episodes.length}</small>
                {/if}
            </button>
        {/each}
    </nav>

    <section class="selected-day-panel">
        <header class="page-header">
            <div>
                <p class="eyebrow">{formatDayDate(selectedDay.date)}</p>
                <h2>{formatFullDayName(selectedDay.date)}</h2>
            </div>

            <p class="muted">
                {selectedDay.episodes.length}
                episode{selectedDay.episodes.length === 1 ? '' : 's'}
            </p>
        </header>

        {#if selectedDay.episodes.length > 0}
            <div class="schedule-episode-grid">
                {#each selectedDay.episodes as episode (episode.id)}
                    <ScheduleEpisodeCard {episode} />
                {/each}
            </div>
        {:else}
            <p class="empty-state">No episodes for this day.</p>
        {/if}
    </section>
</section>

<style>
    .week-controls {
        display: flex;
        gap: var(--space-2);
    }

    .week-summary {
        display: grid;
        gap: 2px;
    }

    .week-summary span,
    .week-summary p {
        margin: 0;
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .week-summary strong {
        font-size: 18px;
    }

    .day-tabs {
        display: grid;
        grid-template-columns: repeat(7, minmax(96px, 1fr));
        gap: var(--space-2);
    }

    .day-tabs button {
        position: relative;
        display: grid;
        gap: 2px;
        min-height: 72px;
        padding: var(--space-3);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        color: var(--color-text-muted);
        text-align: left;
        background: rgb(28 30 38 / 62%);
        cursor: pointer;
        transition:
            border-color 120ms ease,
            background 120ms ease,
            color 120ms ease,
            transform 120ms ease;
    }

    .day-tabs button:hover {
        border-color: var(--color-border-strong);
        color: var(--color-text);
        background: var(--color-panel);
    }

    .day-tabs button.selected {
        border-color: color-mix(in srgb, var(--color-accent) 60%, var(--color-border));
        color: var(--color-text);
        background: linear-gradient(
            135deg,
            color-mix(in srgb, var(--color-accent) 20%, var(--color-panel)),
            var(--color-panel)
        );
    }

    .day-tabs button.current-day::before {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 8px;
        height: 8px;
        border-radius: var(--radius-pill);
        background: var(--color-accent-hover);
        content: '';
        box-shadow: 0 0 0 4px var(--color-accent-muted);
    }

    .day-tabs span {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .day-tabs strong {
        font-size: 15px;
    }

    .day-tabs small {
        width: max-content;
        min-width: 22px;
        padding: 2px 7px;
        border-radius: var(--radius-pill);
        color: var(--color-text);
        background: rgb(255 255 255 / 8%);
        font-size: 12px;
        text-align: center;
    }

    .selected-day-panel {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        min-height: 0;
        padding: var(--space-4);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        background: rgb(15 16 20 / 42%);
    }

    .schedule-episode-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--space-3);
        align-items: start;
    }

    @media (max-width: 1100px) {
        .day-tabs {
            grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
            overflow-x: auto;
            padding-bottom: var(--space-1);
        }

        .day-tabs button {
            min-width: 92px;
        }

        .schedule-episode-grid {
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
    }
</style>
