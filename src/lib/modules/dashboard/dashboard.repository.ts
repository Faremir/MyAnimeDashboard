import { type LibraryRepository, libraryRepository, type LibraryStatus } from '@lib/modules/library';
import { type ScheduleRepository, scheduleRepository } from '@lib/modules/schedule';
import type { StatusTone } from '@lib/shared/ui/status.types';
import { addDays, isDateInRange, startOfDay } from '@lib/shared/utils/date';

import type { DashboardSummary } from './dashboard.types';

class DashboardRepositoryImpl implements DashboardRepository {
    public constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly libraryRepository: LibraryRepository,
    ) {}

    public getSummary(currentDate: Date = new Date()): DashboardSummary {
        const todayStart = startOfDay(currentDate);
        const tomorrowStart = addDays(todayStart, 1);

        const scheduleWeek = this.scheduleRepository.findScheduleWeek({
            date: currentDate,
        });

        const weekEpisodes = scheduleWeek.days.flatMap((day) => day.episodes);

        const todayEpisodeCount = weekEpisodes.filter((episode) =>
            isDateInRange(episode.airDateTime, todayStart, tomorrowStart),
        ).length;

        const weekEpisodeCount = scheduleWeek.episodeCount;

        const trackedAiringAnimeCount = new Set(
            weekEpisodes.filter((episode) => episode.libraryStatus !== undefined).map((episode) => episode.animeId),
        ).size;

        const untrackedAiringAnimeCount = new Set(
            weekEpisodes.filter((episode) => episode.libraryStatus === undefined).map((episode) => episode.animeId),
        ).size;

        const pausedLibraryCount = this.countLibraryEntriesByStatus('paused');

        return {
            libraryStats: [
                {
                    label: 'Watching',
                    status: 'watching',
                    value: this.countLibraryEntriesByStatus('watching'),
                },
                {
                    label: 'Planned',
                    status: 'planned',
                    value: this.countLibraryEntriesByStatus('planned'),
                },
                {
                    label: 'Paused',
                    status: 'paused',
                    value: pausedLibraryCount,
                },
                {
                    label: 'Dropped',
                    status: 'dropped',
                    value: this.countLibraryEntriesByStatus('dropped'),
                },
                {
                    label: 'Completed',
                    status: 'completed',
                    value: this.countLibraryEntriesByStatus('completed'),
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
                    tone: this.getToneForCount(untrackedAiringAnimeCount),
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
    }

    private countLibraryEntriesByStatus(status: LibraryStatus): number {
        return this.libraryRepository.findMany({
            status,
            pageSize: Number.MAX_SAFE_INTEGER,
        }).total;
    }

    private getToneForCount(count: number): StatusTone {
        return count > 0 ? 'warning' : 'good';
    }
}

export interface DashboardRepository {
    getSummary(currentDate?: Date): DashboardSummary;
}

export const dashboardRepository = new DashboardRepositoryImpl(scheduleRepository, libraryRepository);
