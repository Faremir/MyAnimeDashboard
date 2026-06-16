<script lang="ts">
    import Dashboard from '@lib/components/pages/Dashboard.svelte';
    import Library from '@lib/components/pages/Library.svelte';
    import Schedule from '@lib/components/pages/Schedule.svelte';
    import Settings from '@lib/components/pages/Settings.svelte';
    import type { NavigationItem } from '@lib/types/navigation';

    type Props = {
        activeSection: NavigationItem;
        activeItem: NavigationItem;
    };

    let { activeSection, activeItem }: Props = $props();
</script>

<main class="main-panel">
    <div class="main-panel-inner">
        {#if activeSection.id === 'dashboard'}
            <Dashboard {activeItem} />
        {:else if activeSection.id === 'schedule'}
            <Schedule {activeItem} />
        {:else if activeSection.id === 'library'}
            <Library {activeItem} />
        {:else if activeSection.id === 'settings'}
            <Settings {activeItem} />
        {:else}
            <section class="page">
                <header class="page-header">
                    <div class="page-heading">
                        <p class="eyebrow">{activeSection.label}</p>
                        <h1>{activeItem.label}</h1>
                    </div>
                </header>
            </section>
        {/if}
    </div>
</main>

<style>
    .main-panel {
        min-width: 0;
        min-height: 100vh;
        overflow-x: hidden;
        background: transparent;
    }

    .main-panel-inner {
        width: min(100%, var(--layout-main-max-width));
        margin: 0 auto;
        padding: var(--space-6);
    }

    @media (max-width: 760px) {
        .main-panel {
            min-height: auto;
        }

        .main-panel-inner {
            padding: var(--space-4);
        }
    }
</style>
