import type { NavigationItemId, NavigationSectionId } from './navigation.types';

/**
 * Owns module-global navigation selection.
 *
 * The app shell reads this rune-backed state to choose the active top-level
 * section and secondary navigation item.
 */
export class NavigationStore {
    /**
     * Currently selected top-level section.
     */
    public activeSectionId = $state<NavigationSectionId>('dashboard');

    /**
     * Currently selected secondary item inside the active section.
     */
    public activeItemId = $state<NavigationItemId | null>(null);

    /**
     * Moves the app shell to a top-level section.
     */
    public setActiveSectionId(sectionId: NavigationSectionId): void {
        this.activeSectionId = sectionId;
    }

    /**
     * Moves the app shell to a secondary navigation item.
     */
    public setActiveItemId(itemId: NavigationItemId): void {
        this.activeItemId = itemId;
    }

    /**
     * Clears secondary navigation selection when a top-level section is opened.
     */
    public clearActiveItemId(): void {
        this.activeItemId = null;
    }
}

/**
 * Shared navigation module state.
 */
export const navigationStore = new NavigationStore();
