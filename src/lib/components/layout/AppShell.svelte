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
        {secondaryItems} />

    <MainPanel {activeItem} {activeSection} />
</div>

<style>
    .app-shell {
        display: grid;
        grid-template-columns:
            calc(var(--layout-primary-nav-width) + var(--layout-secondary-nav-width))
            minmax(0, 1fr);
        min-height: 100vh;
        width: 100%;
        color: var(--color-text);
    }

    @media (max-width: 760px) {
        .app-shell {
            grid-template-columns: 1fr;
        }
    }
</style>
