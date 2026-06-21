/**
 * Icon keys supported by the navigation shell.
 */
export type NavigationIcon = 'dashboard' | 'calendar' | 'library' | 'settings';

/**
 * Top-level sections that belong in the 1.0 app shell.
 */
export type NavigationSectionId = 'dashboard' | 'schedule' | 'library' | 'settings';

/**
 * Secondary navigation items owned by the Library module.
 */
export type LibraryNavigationItemId =
    | 'library-watching'
    | 'library-completed'
    | 'library-planned'
    | 'library-dropped'
    | 'library-paused';

/**
 * Secondary navigation items owned by the Settings module.
 */
export type SettingsNavigationItemId = 'settings-account-sync' | 'settings-schedule' | 'settings-appearance';

/**
 * Any item that can be selected in the navigation shell.
 */
export type NavigationItemId = NavigationSectionId | LibraryNavigationItemId | SettingsNavigationItemId;

/**
 * Navigation tree item used by the shell.
 */
export type NavigationItem = {
    id: NavigationItemId;
    label: string;
    href: `/${string}`;
    icon?: NavigationIcon;
    description?: string;
    children?: NavigationItem[];
};

/**
 * Top-level navigation item with required shell metadata.
 */
export type NavigationSection = NavigationItem & {
    id: NavigationSectionId;
    icon: NavigationIcon;
    description: string;
};
