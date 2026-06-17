<script lang="ts">
    import { selectNavigationSection } from '@lib/actions/navigation';
    import StatusList from '@lib/components/blocks/StatusList.svelte';
    import { navigationItems } from '@lib/config/navigation';
    import { dashboardRepository } from '@lib/repositories/dashboardRepository';
    import type { NavigationItem } from '@lib/types/navigation';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const summary = dashboardRepository.getSummary();

    const libraryItem = navigationItems.find((item) => item.id === 'library');
    const scheduleItem = navigationItems.find((item) => item.id === 'schedule');
    const settingsItem = navigationItems.find((item) => item.id === 'settings');

    const getSectionHref = (item: NavigationItem | undefined): string => {
        return item ? `#${item.id}` : '#';
    };

    const openSection = (event: MouseEvent, item: NavigationItem | undefined) => {
        event.preventDefault();

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
        <a
            aria-label="Open Library"
            class="surface clickable-surface dashboard-card library-summary"
            href={getSectionHref(libraryItem)}
            onclick={(event) => openSection(event, libraryItem)}>
            <header class="card-header">
                <div>
                    <p class="eyebrow">Library snapshot</p>
                    <h2>Current library state</h2>
                </div>

                <span class="card-destination">Open Library →</span>
            </header>

            <div aria-label="Library status counts" class="stat-grid">
                {#each summary.libraryStats as stat (stat.status)}
                    <div class={`stat-card state-${stat.status}`}>
                        <span>{stat.label}</span>
                        <strong>{stat.value}</strong>
                    </div>
                {/each}
            </div>
        </a>

        <a
            aria-label="Open Schedule"
            class="surface clickable-surface dashboard-card"
            href={getSectionHref(scheduleItem)}
            onclick={(event) => openSection(event, scheduleItem)}>
            <header class="card-header">
                <div>
                    <p class="eyebrow">Schedule status</p>
                    <h2>Airing overview</h2>
                </div>

                <span class="card-destination">Open Schedule →</span>
            </header>

            <div class="metric-list">
                {#each summary.scheduleMetrics as metric (metric.label)}
                    <div class="metric-row">
                        <span>{metric.label}</span>
                        <strong>{metric.value}</strong>
                    </div>
                {/each}
            </div>
        </a>

        <article class="surface dashboard-card">
            <header class="card-header">
                <div>
                    <p class="eyebrow">Attention needed</p>
                    <h2>Review queue</h2>
                </div>
            </header>

            <StatusList ariaLabel="Attention needed" items={summary.attentionItems} />
        </article>

        <a
            aria-label="Open Settings"
            class="surface clickable-surface dashboard-card"
            href={getSectionHref(settingsItem)}
            onclick={(event) => openSection(event, settingsItem)}>
            <header class="card-header">
                <div>
                    <p class="eyebrow">System status</p>
                    <h2>Current setup</h2>
                </div>

                <span class="card-destination">Open Settings →</span>
            </header>

            <StatusList ariaLabel="System status" items={summary.systemItems} />
        </a>
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

    .card-destination {
        color: var(--color-text-muted);
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
    }

    .clickable-surface:hover .card-destination {
        color: var(--color-text);
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
    .metric-row span {
        color: var(--color-text-muted);
        font-size: 13px;
        font-weight: 700;
    }

    .stat-card strong {
        color: var(--color-text);
        font-size: 28px;
        line-height: 1;
    }

    .metric-list {
        display: grid;
        gap: var(--space-3);
    }

    .metric-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-3);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: rgb(20 22 29 / 38%);
    }

    .metric-row strong {
        color: var(--color-text);
        font-size: 16px;
    }

    @media (max-width: 900px) {
        .dashboard-grid {
            grid-template-columns: 1fr;
        }

        .card-header {
            flex-direction: column;
        }

        .card-destination {
            white-space: normal;
        }
    }
</style>