import { libraryRepository, type LibraryStatus } from '@lib/modules/library';
import { scheduleRepository } from '@lib/modules/schedule';
import type { StatusTone } from '@lib/shared/ui/status.types';
import type { WeekStartDay } from '@lib/shared/utils/date';
import { addDays, addWeeks, getWeekStart, isDateInRange, startOfDay } from '@lib/shared/utils/date';

import type { DashboardSummary } from './dashboard.types';

const countLibraryStatus = (status: LibraryStatus): number => {
    return libraryRepository.findMany({
        status,
        pageSize: Number.MAX_SAFE_INTEGER,
    }).total;
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

        const weekDays = scheduleRepository.findWeek(weekStart, weekStartsOn);
        const weekEpisodes = weekDays.flatMap((day) => day.episodes);

        const todayEpisodeCount = weekEpisodes.filter((episode) =>
            isDateInRange(episode.airDateTime, todayStart, tomorrowStart),
        ).length;

        const weekEpisodeCount = weekEpisodes.filter((episode) =>
            isDateInRange(episode.airDateTime, weekStart, nextWeekStart),
        ).length;

        const trackedAiringAnimeCount = new Set(
            weekEpisodes.filter((episode) => episode.libraryStatus !== undefined).map((episode) => episode.animeId),
        ).size;

        const untrackedAiringAnimeCount = new Set(
            weekEpisodes.filter((episode) => episode.libraryStatus === undefined).map((episode) => episode.animeId),
        ).size;

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
