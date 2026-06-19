import type { NavigationSection } from './navigation.types';

export const navigationConfig = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        description: 'Overview of current activity',
    },
    {
        id: 'schedule',
        label: 'Schedule',
        href: '/schedule',
        icon: 'calendar',
        description: 'Episode release calendar',
    },
    {
        id: 'library',
        label: 'Library',
        href: '/library',
        icon: 'library',
        description: 'Your anime list',
        children: [
            {
                id: 'library-watching',
                label: 'Watching',
                href: '/library/watching',
            },
            {
                id: 'library-completed',
                label: 'Completed',
                href: '/library/completed',
            },
            {
                id: 'library-planned',
                label: 'Planned',
                href: '/library/planned',
            },
            {
                id: 'library-dropped',
                label: 'Dropped',
                href: '/library/dropped',
            },
            {
                id: 'library-paused',
                label: 'Paused',
                href: '/library/paused',
            },
        ],
    },
    {
        id: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: 'settings',
        description: 'Application preferences and accounts',
        children: [
            {
                id: 'settings-account-sync',
                label: 'Account & Sync',
                href: '/settings/account-sync',
                description: 'MAL account connection and synchronization status',
            },
            {
                id: 'settings-providers',
                label: 'Providers',
                href: '/settings/providers',
                description: 'External anime data and episode availability sources',
            },
            {
                id: 'settings-schedule',
                label: 'Schedule',
                href: '/settings/schedule',
                description: 'Week, time, and schedule display preferences',
            },
            {
                id: 'settings-appearance',
                label: 'Appearance',
                href: '/settings/appearance',
                description: 'Theme, accent, and layout preferences',
            },
            {
                id: 'settings-local-data',
                label: 'Local Data',
                href: '/settings/local-data',
                description: 'Local-first storage, backups, and data ownership',
            },
        ],
    },
] satisfies [NavigationSection, ...NavigationSection[]];
