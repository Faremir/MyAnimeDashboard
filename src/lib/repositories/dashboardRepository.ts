import { mockLibraryListItems } from '@lib/mock/library';
import { mockScheduledEpisodes } from '@lib/mock/schedule';
import type { DashboardSummary, DashboardTone } from '@lib/types/dashboard';
import type { LibraryStatus } from '@lib/types/library';
import type { WeekStartDay } from '@lib/types/schedule';
import { addDays, addWeeks, getWeekStart, isDateInRange, startOfDay } from '@lib/utils/date';

const countLibraryStatus = (status: LibraryStatus): number => {
    return mockLibraryListItems.filter((entry) => entry.status === status).length;
};

const countUniqueScheduledAnime = (predicate: (libraryStatus: LibraryStatus | undefined) => boolean): number => {
    return new Set(
        mockScheduledEpisodes.filter((episode) => predicate(episode.libraryStatus)).map((episode) => episode.anime.id),
    ).size;
};

const getToneForCount = (count: number): DashboardTone => {
    return count > 0 ? 'warning' : 'good';
};

export const dashboardRepository = {
    getSummary(currentDate: Date = new Date(), weekStartsOn: WeekStartDay = 'monday'): DashboardSummary {
        const todayStart = startOfDay(currentDate);
        const tomorrowStart = addDays(todayStart, 1);
        const weekStart = getWeekStart(currentDate, weekStartsOn);
        const nextWeekStart = addWeeks(weekStart, 1);

        const todayEpisodeCount = mockScheduledEpisodes.filter((episode) =>
            isDateInRange(episode.airDateTime, todayStart, tomorrowStart),
        ).length;

        const weekEpisodeCount = mockScheduledEpisodes.filter((episode) =>
            isDateInRange(episode.airDateTime, weekStart, nextWeekStart),
        ).length;

        const trackedAiringAnimeCount = countUniqueScheduledAnime((libraryStatus) => libraryStatus !== undefined);
        const untrackedAiringAnimeCount = countUniqueScheduledAnime((libraryStatus) => libraryStatus === undefined);
        const pausedLibraryCount = countLibraryStatus('paused');

        return {
            libraryStats: [
                {
                    label: 'Watching',
                    status: 'watching',
                    value: countLibraryStatus('watching'),
                },
                {
                    label: 'Planned',
                    status: 'planned',
                    value: countLibraryStatus('planned'),
                },
                {
                    label: 'Paused',
                    status: 'paused',
                    value: pausedLibraryCount,
                },
                {
                    label: 'Dropped',
                    status: 'dropped',
                    value: countLibraryStatus('dropped'),
                },
                {
                    label: 'Completed',
                    status: 'completed',
                    value: countLibraryStatus('completed'),
                },
            ],
            scheduleMetrics: [
                {
                    label: 'Episodes today',
                    value: todayEpisodeCount,
                },
                {
                    label: 'Episodes this week',
                    value: weekEpisodeCount,
                },
                {
                    label: 'Tracked airing anime',
                    value: trackedAiringAnimeCount,
                },
                {
                    label: 'Untracked airing anime',
                    value: untrackedAiringAnimeCount,
                },
            ],
            attentionItems: [
                {
                    label: 'MAL account',
                    value: 'Not connected',
                    tone: 'warning',
                },
                {
                    label: 'Local persistence',
                    value: 'Not enabled yet',
                    tone: 'warning',
                },
                {
                    label: 'Untracked airing anime',
                    value: `${untrackedAiringAnimeCount}`,
                    tone: getToneForCount(untrackedAiringAnimeCount),
                },
                {
                    label: 'Paused library entries',
                    value: `${pausedLibraryCount}`,
                    tone: pausedLibraryCount > 0 ? 'neutral' : 'good',
                },
            ],
            systemItems: [
                {
                    label: 'Data mode',
                    value: 'Mock data',
                    tone: 'neutral',
                },
                {
                    label: 'Library source',
                    value: 'Mock repository',
                    tone: 'neutral',
                },
                {
                    label: 'Schedule source',
                    value: 'Mock repository',
                    tone: 'neutral',
                },
                {
                    label: 'Sync',
                    value: 'Not configured',
                    tone: 'warning',
                },
            ],
        };
    },
};
