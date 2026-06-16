import type { NavigationItem } from '@lib/types/navigation';

export const navigationItems: NavigationItem[] = [
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
    },
];
