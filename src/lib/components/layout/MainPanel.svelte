<script lang="ts">
    import type {NavigationItem} from '@lib/types/navigation';

    import Dashboard from '@lib/components/pages/Dashboard.svelte';
    import Seasons from '@lib/components/pages/Seasons.svelte';
    import Schedule from '@lib/components/pages/Schedule.svelte';
    import Library from '@lib/components/pages/Library.svelte';
    import Settings from '@lib/components/pages/Settings.svelte';

    type Props = {
        activeSection: NavigationItem;
        activeItem: NavigationItem;
    };

    let {activeSection, activeItem}: Props = $props();
</script>

<main class="main-panel">
    {#if activeSection.id === 'dashboard'}
        <Dashboard activeItem={activeItem}/>
    {:else if activeSection.id === 'seasons'}
        <Seasons activeItem={activeItem}/>
    {:else if activeSection.id === 'schedule'}
        <Schedule activeItem={activeItem}/>
    {:else if activeSection.id === 'library'}
        <Library activeItem={activeItem}/>
    {:else if activeSection.id === 'settings'}
        <Settings activeItem={activeItem}/>
    {:else}
        <h1>{activeItem.label}</h1>
    {/if}
</main>

<style>
    .main-panel {
        min-width: 0;
        padding: 24px;
        background: var(--color-bg);
    }
</style>