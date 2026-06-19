import { navigationConfig } from './navigation.config';
import type { NavigationItem, NavigationSection, NavigationSectionId } from './navigation.types';

class NavigationRepositoryImpl implements NavigationRepository {
    public getNavigationSections(): NavigationSection[] {
        return navigationConfig;
    }

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

/**
 * Read boundary for navigation metadata.
 *
 * The repository hides the static config shape from app composition and keeps
 * navigation lookup behavior in one place.
 */
export interface NavigationRepository {
    /**
     * Gets all top-level navigation sections for shell rendering.
     */
    getNavigationSections(): NavigationSection[];

    /**
     * Gets a top-level navigation section or throws when config is invalid.
     */
    getNavigationSection(id: NavigationSectionId): NavigationSection;

    /**
     * Resolves the href used for anchor semantics and fallback navigation.
     */
    getNavigationHref(item: NavigationItem): string;

    /**
     * Gets the section used as the shell's initial navigation fallback.
     */
    getDefaultNavigationSection(): NavigationSection;
}

/**
 * Shared navigation read model.
 */
export const navigationRepository = new NavigationRepositoryImpl();
