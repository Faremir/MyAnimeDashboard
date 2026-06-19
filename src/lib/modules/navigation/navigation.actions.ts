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
 *
 */
export interface NavigationActions {
    /**
     *
     * @param sectionId
     */
    openNavigationSection(sectionId: NavigationSectionId): void;

    /**
     *
     * @param childId
     */
    openNavigationItem(childId: NavigationItemId): void;
}

export const navigationActions = new NavigationActionsImpl(navigationStore, animeActions);
