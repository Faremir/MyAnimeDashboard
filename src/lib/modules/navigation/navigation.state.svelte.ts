import type { NavigationItemId, NavigationSectionId } from './navigation.types';

export class NavigationStore {
    public activeSectionId = $state<NavigationSectionId>('dashboard');
    public activeItemId = $state<NavigationItemId | null>(null);

    public setActiveSectionId(sectionId: NavigationSectionId): void {
        this.activeSectionId = sectionId;
    }

    public setActiveItemId(itemId: NavigationItemId): void {
        this.activeItemId = itemId;
    }

    public clearActiveItemId(): void {
        this.activeItemId = null;
    }
}

export const navigationStore = new NavigationStore();
