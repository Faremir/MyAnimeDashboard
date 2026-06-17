import { navigationItems } from './navigation.config';
import type { NavigationItem, NavigationSection, NavigationSectionId } from './navigation.types';

export const navigationRepository = {
    findNavigationSection(id: NavigationSectionId): NavigationSection | undefined {
        return navigationItems.find((item) => item.id === id);
    },
    getNavigationHref(item: NavigationItem | undefined): string {
        return item?.href ?? '#';
    },

    getDefaultNavigationSection(): NavigationSection {
        return navigationItems[0];
    },
};
