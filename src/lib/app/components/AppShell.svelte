<script lang="ts">
    import type { NavigationItem, NavigationSection } from '@lib/modules/navigation';
    import {
        activeChildId,
        activeSectionId,
        navigationItems,
        navigationRepository,
        NavigationShell,
        selectNavigationItem,
        selectNavigationSection,
    } from '@lib/modules/navigation';

    import MainPanel from './MainPanel.svelte';

    let activeSection: NavigationSection = $derived(
        navigationRepository.findNavigationSection($activeSectionId) ??
            navigationRepository.getDefaultNavigationSection(),
    );

    let secondaryItems: NavigationItem[] = $derived(
        activeSection.children?.length ? activeSection.children : [activeSection],
    );

    let activeItem: NavigationItem = $derived(
        secondaryItems.find((item: NavigationItem) => item.id === $activeChildId) ?? secondaryItems[0] ?? activeSection,
    );
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
