<script lang="ts">
    import { selectNavigationItem, selectNavigationSection } from '@lib/actions/navigation';
    import NavigationShell from '@lib/components/layout/NavigationShell.svelte';
    import { navigationItems } from '@lib/config/navigation';
    import { activeChildId, activeSectionId } from '@lib/state/navigation';

    import MainPanel from './MainPanel.svelte';

    let activeSection = $derived(navigationItems.find((item) => item.id === $activeSectionId) ?? navigationItems[0]);

    let secondaryItems = $derived(activeSection.children ?? [activeSection]);

    let activeItem = $derived(secondaryItems.find((item) => item.id === $activeChildId) ?? secondaryItems[0]);
</script>

<div class="app-shell">
    <NavigationShell
        {activeItem}
        {activeSection}
        onSelectItem={selectNavigationItem}
        onSelectSection={selectNavigationSection}
        primaryItems={navigationItems}
        {secondaryItems}
    />

    <MainPanel {activeItem} {activeSection} />
</div>

<style>
    .app-shell {
        display: grid;
        grid-template-columns: 312px 1fr;
        min-height: 100vh;
        background: var(--color-bg);
    }
</style>
