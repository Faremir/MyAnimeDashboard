import { type AnimeActions, animeActions } from '@lib/modules/anime';

import { type NavigationStore, navigationStore } from './navigation.state.svelte';
import type { NavigationItemId, NavigationSectionId } from './navigation.types';

class NavigationActionsImpl implements NavigationActions {
    public constructor(
        private readonly store: NavigationStore,
        private readonly animeActions: AnimeActions,
    ) {}

    public openNavigationSection(sectionId: NavigationSectionId): void {
        this.animeActions.closeAnimePage();
        this.store.setActiveSectionId(sectionId);
        this.store.clearActiveItemId();
    }

    public openNavigationItem(itemId: NavigationItemId): void {
        this.animeActions.closeAnimePage();
        this.store.setActiveItemId(itemId);
    }
}

/**
 * Public command API for navigation intent.
 *
 * Navigation actions coordinate with module-level surfaces such as AnimePage so
 * changing sections does not leave stale detail state open.
 */
export interface NavigationActions {
    /**
     * Opens a top-level navigation section and clears any active child item.
     */
    openNavigationSection(sectionId: NavigationSectionId): void;

    /**
     * Opens a child navigation item within the current section.
     */
    openNavigationItem(childId: NavigationItemId): void;
}

/**
 * Shared navigation command object used by navigation UI and dashboard links.
 */
export const navigationActions = new NavigationActionsImpl(navigationStore, animeActions);
