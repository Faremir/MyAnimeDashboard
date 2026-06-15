<script lang="ts">
    import {navigationItems} from '@lib/config/navigation';
    import {activeSectionId, activeChildId} from '@lib/stores/navigation';

    import {
        selectNavigationItem,
        selectNavigationSection,
    } from '@lib/actions/navigation';

    import NavigationShell from '@lib/components/layout/NavigationShell.svelte';
    import MainPanel from './MainPanel.svelte';

    let activeSection = $derived(
        navigationItems.find((item) => item.id === $activeSectionId) ?? navigationItems[0],
    );

    let secondaryItems = $derived(activeSection.children ?? [activeSection]);

    let activeItem = $derived(
        secondaryItems.find((item) => item.id === $activeChildId) ?? secondaryItems[0],
    );
</script>

<div class="app-shell">
    <NavigationShell
        primaryItems={navigationItems}
        secondaryItems={secondaryItems}
        activeSection={activeSection}
        activeItem={activeItem}
        onSelectSection={selectNavigationSection}
        onSelectItem={selectNavigationItem}
    />

    <MainPanel activeSection={activeSection} activeItem={activeItem}/>
</div>


<style>
    .app-shell {
        display: grid;
        grid-template-columns: 312px 1fr;
        min-height: 100vh;
        background: var(--color-bg);
    }
</style>