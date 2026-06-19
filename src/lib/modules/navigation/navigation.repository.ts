import { navigationConfig } from './navigation.config';
import type { NavigationItem, NavigationSection, NavigationSectionId } from './navigation.types';

class NavigationRepositoryImpl implements NavigationRepository {
    public getNavigationSection(sectionId: NavigationSectionId): NavigationSection {
        const navigationItem = navigationConfig.find((item) => item.id === sectionId);
        if (!navigationItem) {
            throw new Error(`Navigation section ${sectionId} not found.`);
        }
        return navigationItem;
    }
    public getNavigationHref(item: NavigationItem): string {
        return item.href;
    }

    public getDefaultNavigationSection(): NavigationSection {
        return navigationConfig[0];
    }
}

export interface NavigationRepository {
    getNavigationSection(id: NavigationSectionId): NavigationSection;
    getNavigationHref(item: NavigationItem): string;
    getDefaultNavigationSection(): NavigationSection;
}

export const navigationRepository = new NavigationRepositoryImpl();
