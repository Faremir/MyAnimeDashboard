import { mockLibraryListItems } from '@lib/mock/library';
import { mockScheduledEpisodes } from '@lib/mock/schedule';
import type { DashboardSummary } from '@lib/types/dashboard';
import type { LibraryStatus } from '@lib/types/library';
import type { WeekStartDay } from '@lib/types/schedule';
import type { StatusTone } from '@lib/types/status';
import { addDays, addWeeks, getWeekStart, isDateInRange, startOfDay } from '@lib/utils/date';

const countLibraryStatus = (status: LibraryStatus): number => {
    return mockLibraryListItems.filter((entry) => entry.status === status).length;
};

const countUniqueScheduledAnime = (predicate: (libraryStatus: LibraryStatus | undefined) => boolean): number => {
    return new Set(
        mockScheduledEpisodes.filter((episode) => predicate(episode.libraryStatus)).map((episode) => episode.anime.id),
    ).size;
};

const getToneForCount = (count: number): StatusTone => {
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
                    description: 'MyAnimeList login and sync are planned for a later milestone.',
                },
                {
                    label: 'Local persistence',
                    value: 'Not enabled yet',
                    tone: 'warning',
                    description: 'Current data is still temporary mock data.',
                },
                {
                    label: 'Untracked airing anime',
                    value: `${untrackedAiringAnimeCount}`,
                    tone: getToneForCount(untrackedAiringAnimeCount),
                    description: 'Airing titles not currently represented as library entries.',
                },
                {
                    label: 'Paused library entries',
                    value: `${pausedLibraryCount}`,
                    tone: pausedLibraryCount > 0 ? 'neutral' : 'good',
                    description: 'Paused entries may need review later.',
                },
            ],
            systemItems: [
                {
                    label: 'Data mode',
                    value: 'Mock data',
                    tone: 'neutral',
                    description: 'The current app preview is powered by test data.',
                },
                {
                    label: 'Library source',
                    value: 'Mock repository',
                    tone: 'neutral',
                    description: 'Persistent library storage is planned for a later milestone.',
                },
                {
                    label: 'Schedule source',
                    value: 'Mock repository',
                    tone: 'neutral',
                    description: 'Real schedule discovery is planned for a later milestone.',
                },
                {
                    label: 'Sync',
                    value: 'Not configured',
                    tone: 'warning',
                    description: 'Sync settings will become available after MAL integration.',
                },
            ],
        };
    },
};
