<script lang="ts">
    import { navigationRepository } from '@lib/modules/navigation';

    import { navigationActions } from '../navigation.actions';
    import type { NavigationIcon, NavigationItem, NavigationSection } from '../navigation.types';

    type Props = {
        activeSection: NavigationSection;
        activeItem: NavigationItem;
        secondaryItems: NavigationItem[];
    };

    let { secondaryItems, activeSection, activeItem }: Props = $props();

    const iconByName: Record<NavigationIcon, string> = {
        dashboard: '◆',
        calendar: '◷',
        library: '▣',
        settings: '⚙',
    };

    const getIcon = (item: NavigationItem): string => {
        if (!item.icon) {
            return item.label.slice(0, 1).toUpperCase();
        }

        return iconByName[item.icon] ?? item.label.slice(0, 1).toUpperCase();
    };
</script>

<div class="navigation-shell">
    <nav aria-label="Primary navigation" class="primary-navigation">
        <div aria-label="MAD" class="app-mark">M</div>

        <div class="primary-navigation-list">
            {#each navigationRepository.getNavigationSections() as item (item.id)}
                <button
                    aria-current={item.id === activeSection.id ? 'page' : undefined}
                    aria-label={item.label}
                    class="primary-navigation-button"
                    onclick={() => navigationActions.openNavigationSection(item.id)}
                    title={item.label}
                    type="button">
                    <span>{getIcon(item)}</span>
                </button>
            {/each}
        </div>
    </nav>

    <aside class="secondary-navigation">
        <header class="secondary-header">
            <p class="eyebrow">My Anime Dashboard</p>
            <h2>{activeSection.label}</h2>

            {#if activeSection.description}
                <p>{activeSection.description}</p>
            {/if}
        </header>

        <nav aria-label="Secondary navigation" class="secondary-navigation-list">
            {#each secondaryItems as item (item.id)}
                <button
                    aria-current={item.id === activeItem.id ? 'page' : undefined}
                    class="secondary-navigation-button"
                    onclick={() => navigationActions.openNavigationItem(item.id)}
                    type="button">
                    <span>{item.label}</span>

                    {#if item.description}
                        <small>{item.description}</small>
                    {/if}
                </button>
            {/each}
        </nav>
    </aside>
</div>

<style>
    .navigation-shell {
        position: sticky;
        top: 0;
        display: grid;
        grid-template-columns: var(--layout-primary-nav-width) var(--layout-secondary-nav-width);
        height: 100vh;
        min-height: 100vh;
        width: calc(var(--layout-primary-nav-width) + var(--layout-secondary-nav-width));
        overflow: hidden;
    }

    .primary-navigation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
        padding: var(--space-4) var(--space-3);
        border-right: 1px solid rgb(255 255 255 / 6%);
        background: #0b0c10;
    }

    .app-mark {
        display: grid;
        width: 44px;
        height: 44px;
        place-items: center;
        border-radius: 15px;
        color: white;
        background:
            radial-gradient(circle at 30% 20%, rgb(255 255 255 / 22%), transparent 34%),
            linear-gradient(135deg, var(--color-accent), #5cc8ff);
        box-shadow: 0 10px 24px rgb(139 92 246 / 30%);
        font-weight: 900;
        letter-spacing: -0.04em;
    }

    .primary-navigation-list {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: var(--space-2);
    }

    .primary-navigation-button {
        position: relative;
        display: grid;
        width: 48px;
        height: 48px;
        place-items: center;
        border: 0;
        border-radius: 17px;
        color: var(--color-text-muted);
        background: transparent;
        cursor: pointer;
        transition:
            border-radius 140ms ease,
            color 140ms ease,
            background 140ms ease,
            transform 140ms ease;
    }

    .primary-navigation-button::before {
        position: absolute;
        left: -12px;
        width: 4px;
        height: 0;
        border-radius: var(--radius-pill);
        background: var(--color-text);
        content: '';
        transition: height 140ms ease;
    }

    .primary-navigation-button span {
        font-size: 19px;
        line-height: 1;
    }

    .primary-navigation-button:hover {
        border-radius: 14px;
        color: var(--color-text);
        background: var(--color-panel-alt);
        transform: translateY(-1px);
    }

    .primary-navigation-button[aria-current='page'] {
        border-radius: 14px;
        color: white;
        background: var(--color-accent);
    }

    .primary-navigation-button[aria-current='page']::before {
        height: 26px;
    }

    .secondary-navigation {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-5);
        border-right: 1px solid var(--color-border);
        background: linear-gradient(180deg, rgb(255 255 255 / 3%), transparent 140px), var(--color-bg-elevated);
    }

    .secondary-header {
        display: grid;
        gap: var(--space-1);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--color-border);
    }

    .secondary-header h2,
    .secondary-header p {
        margin: 0;
    }

    .secondary-header h2 {
        font-size: 22px;
        line-height: 1.15;
        letter-spacing: -0.03em;
    }

    .secondary-header p:not(.eyebrow) {
        color: var(--color-text-muted);
        font-size: 13px;
        line-height: 1.45;
    }

    .secondary-navigation-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
    }

    .secondary-navigation-button {
        display: grid;
        gap: 2px;
        width: 100%;
        padding: 10px 12px;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        color: var(--color-text-muted);
        text-align: left;
        background: transparent;
        cursor: pointer;
        transition:
            border-color 120ms ease,
            color 120ms ease,
            background 120ms ease,
            transform 120ms ease;
    }

    .secondary-navigation-button span {
        font-weight: 700;
    }

    .secondary-navigation-button small {
        color: var(--color-text-subtle);
        font-size: 12px;
    }

    .secondary-navigation-button:hover {
        color: var(--color-text);
        background: rgb(255 255 255 / 5%);
    }

    .secondary-navigation-button[aria-current='page'] {
        border-color: rgb(139 92 246 / 28%);
        color: var(--color-text);
        background: var(--color-accent-muted);
    }

    @media (max-width: 760px) {
        .navigation-shell {
            position: static;
            grid-template-columns: 1fr;
            height: auto;
            min-height: 0;
            width: 100%;
        }

        .primary-navigation {
            flex-direction: row;
            justify-content: space-between;
            padding: var(--space-3);
        }

        .primary-navigation-list {
            flex: none;
            flex-direction: row;
            overflow-x: auto;
        }

        .secondary-navigation {
            display: none;
        }
    }
</style>
