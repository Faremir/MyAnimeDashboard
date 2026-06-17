export type NavigationIcon = 'dashboard' | 'calendar' | 'library' | 'settings';

export type NavigationSectionId = 'dashboard' | 'schedule' | 'library' | 'settings';

export type LibraryNavigationItemId =
    | 'library-watching'
    | 'library-completed'
    | 'library-planned'
    | 'library-dropped'
    | 'library-paused';

export type SettingsNavigationItemId =
    | 'settings-account-sync'
    | 'settings-providers'
    | 'settings-schedule'
    | 'settings-appearance'
    | 'settings-local-data';

export type NavigationItemId = NavigationSectionId | LibraryNavigationItemId | SettingsNavigationItemId;

export type NavigationItem = {
    id: NavigationItemId;
    label: string;
    href: `/${string}`;
    icon?: NavigationIcon;
    description?: string;
    children?: NavigationItem[];
};

export type NavigationSection = NavigationItem & {
    id: NavigationSectionId;
    icon: NavigationIcon;
    description: string;
};
