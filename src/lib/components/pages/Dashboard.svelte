<script lang="ts">
    import { selectNavigationSection } from '@lib/actions/navigation';
    import { navigationItems } from '@lib/config/navigation';
    import { mockLibraryListItems } from '@lib/mock/library';
    import { mockScheduledEpisodes } from '@lib/mock/schedule';
    import type { LibraryStatus } from '@lib/types/library';
    import type { NavigationItem } from '@lib/types/navigation';

    type Props = {
        activeItem: NavigationItem;
    };

    type LibraryStat = {
        label: string;
        value: number;
        status: LibraryStatus;
    };

    type StatusItem = {
        label: string;
        value: string;
        tone?: 'good' | 'warning' | 'neutral';
    };

    let { activeItem }: Props = $props();

    const libraryItem = navigationItems.find((item) => item.id === 'library');
    const scheduleItem = navigationItems.find((item) => item.id === 'schedule');
    const settingsItem = navigationItems.find((item) => item.id === 'settings');

    const startOfDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const addDays = (date: Date, days: number): Date => {
        const nextDate = new Date(startOfDay(date));
        nextDate.setDate(nextDate.getDate() + days);

        return nextDate;
    };

    const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
        const time = date.getTime();

        return time >= start.getTime() && time < end.getTime();
    };

    const getWeekStart = (date: Date): Date => {
        const dayStart = startOfDay(date);
        const dayOfWeek = dayStart.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        return addDays(dayStart, mondayOffset);
    };

    const countLibraryStatus = (status: LibraryStatus): number => {
        return mockLibraryListItems.filter((entry) => entry.status === status).length;
    };

    const currentDate = new Date();
    const todayStart = startOfDay(currentDate);
    const tomorrowStart = addDays(todayStart, 1);
    const weekStart = getWeekStart(currentDate);
    const nextWeekStart = addDays(weekStart, 7);

    const todayEpisodeCount = mockScheduledEpisodes.filter((episode) =>
        isDateInRange(episode.airDateTime, todayStart, tomorrowStart),
    ).length;

    const weekEpisodeCount = mockScheduledEpisodes.filter((episode) =>
        isDateInRange(episode.airDateTime, weekStart, nextWeekStart),
    ).length;

    const trackedAiringAnimeCount = new Set(
        mockScheduledEpisodes
            .filter((episode) => episode.libraryStatus !== undefined)
            .map((episode) => episode.anime.id),
    ).size;

    const untrackedAiringAnimeCount = new Set(
        mockScheduledEpisodes
            .filter((episode) => episode.libraryStatus === undefined)
            .map((episode) => episode.anime.id),
    ).size;

    const pausedLibraryCount = countLibraryStatus('paused');

    const libraryStats: LibraryStat[] = [
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
    ];

    const attentionItems: StatusItem[] = [
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
            tone: untrackedAiringAnimeCount > 0 ? 'warning' : 'good',
        },
        {
            label: 'Paused library entries',
            value: `${pausedLibraryCount}`,
            tone: pausedLibraryCount > 0 ? 'neutral' : 'good',
        },
    ];

    const systemItems: StatusItem[] = [
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
    ];

    const openSection = (item: NavigationItem | undefined) => {
        if (!item) {
            return;
        }

        selectNavigationSection(item);
    };
</script>

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Dashboard</h1>
            <p class="muted">High-level status and attention overview for your anime dashboard.</p>
        </div>
    </header>

    <div class="dashboard-grid">
        <article class="surface dashboard-card library-summary">
            <header class="card-header">
                <div>
                    <p class="eyebrow">Library snapshot</p>
                    <h2>Current library state</h2>
                </div>

                <button class="button ghost" onclick={() => openSection(libraryItem)} type="button">
                    Open Library
                </button>
            </header>

            <div aria-label="Library status counts" class="stat-grid">
                {#each libraryStats as stat (stat.status)}
                    <div class={`stat-card state-${stat.status}`}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                    </div>
                {/each}
            </div>
        </article>

        <article class="surface dashboard-card">
            <header class="card-header">
                <div>
                    <p class="eyebrow">Schedule status</p>
                    <h2>Airing overview</h2>
                </div>

                <button class="button ghost" onclick={() => openSection(scheduleItem)} type="button">
                    Open Schedule
                </button>
            </header>

            <div class="metric-list">
                <div class="metric-row">
                    <span>Episodes today</span>
                    <strong>{todayEpisodeCount}</strong>
                </div>

                <div class="metric-row">
                    <span>Episodes this week</span>
                    <strong>{weekEpisodeCount}</strong>
                </div>

                <div class="metric-row">
                    <span>Tracked airing anime</span>
                    <strong>{trackedAiringAnimeCount}</strong>
                </div>

                <div class="metric-row">
                    <span>Untracked airing anime</span>
                    <strong>{untrackedAiringAnimeCount}</strong>
                </div>
            </div>
        </article>

        <article class="surface dashboard-card">
            <header class="card-header">
                <div>
                    <p class="eyebrow">Attention needed</p>
                    <h2>Review queue</h2>
                </div>
            </header>

            <div class="status-list">
                {#each attentionItems as item (item.label)}
                    <div class={`status-row tone-${item.tone ?? 'neutral'}`}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                    </div>
                {/each}
            </div>
        </article>

        <article class="surface dashboard-card">
            <header class="card-header">
                <div>
                    <p class="eyebrow">System status</p>
                    <h2>Current setup</h2>
                </div>

                <button class="button ghost" onclick={() => openSection(settingsItem)} type="button">
                    Open Settings
                </button>
            </header>

            <div class="status-list">
                {#each systemItems as item (item.label)}
                    <div class={`status-row tone-${item.tone ?? 'neutral'}`}>
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                    </div>
                {/each}
            </div>
        </article>
    </div>
</section>

<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-4);
    }

    .dashboard-card {
        display: grid;
        gap: var(--space-4);
        padding: var(--space-5);
    }

    .library-summary {
        grid-column: 1 / -1;
    }

    .card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--space-4);
    }

    .card-header h2,
    .card-header p {
        margin: 0;
    }

    .card-header h2 {
        margin-top: var(--space-1);
        font-size: 20px;
    }

    .stat-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: var(--space-3);
    }

    .stat-card {
        display: grid;
        gap: var(--space-2);
        padding: var(--space-4);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--state-color);
        border-radius: var(--radius-md);
        background: rgb(20 22 29 / 52%);
    }

    .stat-card span,
    .metric-row span,
    .status-row span {
        color: var(--color-text-muted);
        font-size: 13px;
        font-weight: 700;
    }

    .stat-card strong {
        color: var(--color-text);
        font-size: 28px;
        line-height: 1;
    }

    .metric-list,
    .status-list {
        display: grid;
        gap: var(--space-3);
    }

    .metric-row,
    .status-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-3);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: rgb(20 22 29 / 38%);
    }

    .metric-row strong,
    .status-row strong {
        color: var(--color-text);
        font-size: 16px;
    }

    .status-row {
        border-left: 4px solid var(--color-border-strong);
    }

    .tone-good {
        border-left-color: var(--color-success);
    }

    .tone-warning {
        border-left-color: var(--color-warning);
    }

    .tone-neutral {
        border-left-color: var(--color-border-strong);
    }

    @media (max-width: 900px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
        }

        .card-header {
            flex-direction: column;
        }

        .card-header .button {
            width: 100%;
        }
    }
</style>
