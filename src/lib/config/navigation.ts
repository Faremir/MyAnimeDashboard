import type {NavigationItem} from '@lib/types/navigation';

export const navigationItems: NavigationItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/dashboard',
        icon: 'dashboard',
        description: 'Overview of current activity',
    },
    {
        id: 'seasons',
        label: 'Seasons',
        href: '/seasons',
        icon: 'seasons',
        description: 'Browse seasonal anime',
        children: [
            {
                id: 'seasons-current',
                label: 'Current Season',
                href: '/seasons/current',
            },
            {
                id: 'seasons-upcoming',
                label: 'Upcoming',
                href: '/seasons/upcoming',
            },
            {
                id: 'seasons-past',
                label: 'Past',
                href: '/seasons/past',
            },
        ],
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