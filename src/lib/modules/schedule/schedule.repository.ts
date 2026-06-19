import { type AnimeRepository, animeRepository } from '@lib/modules/anime';
import { type LibraryRepository, libraryRepository, type LibraryStatus } from '@lib/modules/library';
import type { WeekStartDay } from '@lib/shared/utils/date';
import { addDays, addWeeks, getWeekStart, isDateInRange, isSameDay } from '@lib/shared/utils/date';

import { mockSchedule } from './schedule.mock';
import type {
    ScheduleDay,
    ScheduledEpisodeReference,
    ScheduledEpisodeView,
    ScheduleFilterStatus,
    ScheduleWeekQuery,
    ScheduleWeekView,
} from './schedule.types';

class ScheduleRepositoryImpl implements ScheduleRepository {
    public constructor(
        private readonly scheduledEpisodes: ScheduledEpisodeReference[],
        private readonly weekStartsOn: WeekStartDay,
        private readonly animeRepository: AnimeRepository,
        private readonly libraryRepository: LibraryRepository,
    ) {}

    public findScheduleWeek(query: ScheduleWeekQuery = {}): ScheduleWeekView {
        const { date = new Date(), filterStatus = 'all' } = query;

        const weekStart = getWeekStart(date, this.weekStartsOn);
        const weekEndExclusive = addWeeks(weekStart, 1);
        const weekEnd = addDays(weekEndExclusive, -1);

        const weekEpisodes = this.scheduledEpisodes
            .filter((episode) => isDateInRange(episode.airDateTime, weekStart, weekEndExclusive))
            .map((episode) => this.hydrateReferences(episode))
            .filter((episode) => this.matchesFilter(episode.libraryStatus, filterStatus));

        const days = this.createScheduleDays(weekStart, weekEpisodes);

        return {
            startDate: weekStart,
            endDate: weekEnd,
            days,
            episodeCount: weekEpisodes.length,
        };
    }

    /**
     * Builds component-facing schedule views.
     *
     * Anime metadata is resolved through AnimeRepository, while library status
     * is derived from LibraryRepository so Schedule never owns watch state.
     */
    private hydrateReferences(episode: ScheduledEpisodeReference): ScheduledEpisodeView {
        return {
            ...episode,
            anime: this.animeRepository.getAnime(episode.animeId),
            libraryStatus: this.libraryRepository.findLibraryStatusByAnimeId(episode.animeId),
        };
    }

    private matchesFilter(libraryStatus: LibraryStatus | undefined, filterStatus: ScheduleFilterStatus): boolean {
        if (filterStatus === 'all') {
            return true;
        }

        if (filterStatus === 'not-in-library') {
            return libraryStatus === undefined;
        }

        return libraryStatus === filterStatus;
    }

    private sortEpisodesByAirTime(episodes: ScheduledEpisodeView[]): ScheduledEpisodeView[] {
        return [...episodes].sort((left, right) => left.airDateTime.getTime() - right.airDateTime.getTime());
    }

    private createScheduleDays(weekStart: Date, episodes: ScheduledEpisodeView[]): ScheduleDay[] {
        const scheduleDays: ScheduleDay[] = [];

        for (let dayOffset = 0; dayOffset < 7; dayOffset += 1) {
            const date = addDays(weekStart, dayOffset);
            const dayEpisodes = episodes.filter((episode) => isSameDay(episode.airDateTime, date));

            scheduleDays.push({
                date,
                episodes: this.sortEpisodesByAirTime(dayEpisodes),
            });
        }

        return scheduleDays;
    }
}

/**
 * Query boundary for schedule week views.
 *
 * The repository owns week-start rules and hides whether schedule data comes
 * from seed data, local storage, or a future discovery pipeline. Library state
 * is joined at view-build time and remains owned by the Library module.
 */
export interface ScheduleRepository {
    /**
     * Finds the schedule week containing the query date and applies view filters.
     */
    findScheduleWeek(query?: ScheduleWeekQuery): ScheduleWeekView;
}

/**
 * Shared schedule read model.
 */
export const scheduleRepository = new ScheduleRepositoryImpl(
    mockSchedule,
    'monday',
    animeRepository,
    libraryRepository,
);
