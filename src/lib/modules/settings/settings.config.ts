import type { SettingsSection } from './settings.types';

export const settingsSections = [
    {
        id: 'settings-account-sync',
        title: 'Account and sync',
        description: 'Future account connection and synchronization settings.',
        items: [
            {
                label: 'MyAnimeList',
                value: 'Planned',
                tone: 'warning',
                description: 'Login and sync are planned for a later milestone.',
            },
            {
                label: 'Sync direction',
                value: 'Not configured',
                tone: 'neutral',
                description: 'MAD will eventually keep local data and MAL data aligned.',
            },
            {
                label: 'Sync status',
                value: 'Unavailable',
                tone: 'warning',
                description: 'Synchronization is not available in the current alpha baseline.',
            },
        ],
    },
    {
        id: 'settings-providers',
        title: 'Providers and data',
        description: 'External anime data sources planned for discovery and watch availability.',
        items: [
            {
                label: 'Anime metadata',
                value: 'Jikan planned',
                tone: 'warning',
                description: 'Jikan will be used for MyAnimeList-based anime metadata discovery.',
            },
            {
                label: 'Episode availability',
                value: 'Anikoto planned',
                tone: 'warning',
                description: 'Anikoto will be used for episode and watch-link availability.',
            },
            {
                label: 'Current data mode',
                value: 'Mock data',
                tone: 'neutral',
                description: 'Current screens use temporary local test data.',
            },
        ],
    },
    {
        id: 'settings-schedule',
        title: 'Schedule preferences',
        description: 'Settings that will control how airing schedules are displayed.',
        items: [
            {
                label: 'Week starts on',
                value: 'Monday',
                tone: 'good',
                description: 'Current mock schedule uses Monday-based week navigation.',
            },
            {
                label: 'Time display',
                value: 'Local time',
                tone: 'neutral',
                description: 'Future settings may allow more control over time formatting.',
            },
            {
                label: 'Schedule filters',
                value: 'Available',
                tone: 'good',
                description: 'The current schedule preview already supports status filtering.',
            },
        ],
    },
    {
        id: 'settings-appearance',
        title: 'Appearance',
        description: 'Visual preferences for the app shell and interface.',
        items: [
            {
                label: 'Theme',
                value: 'Dark',
                tone: 'good',
                description: 'The current app foundation uses a dark desktop-style theme.',
            },
            {
                label: 'Accent color',
                value: 'Default',
                tone: 'neutral',
                description: 'Accent customization is planned for a later stage.',
            },
            {
                label: 'Layout',
                value: 'Desktop shell',
                tone: 'good',
                description: 'The app currently uses a desktop-dashboard layout foundation.',
            },
        ],
    },
    {
        id: 'settings-local-data',
        title: 'Local data',
        description: 'Future local-first storage and user-owned data management.',
        items: [
            {
                label: 'Local storage',
                value: 'Planned',
                tone: 'warning',
                description: 'Persistent local storage is planned for a later milestone.',
            },
            {
                label: 'Data ownership',
                value: 'Local-first',
                tone: 'good',
                description: 'MAD is designed around local data as the long-term source of truth.',
            },
            {
                label: 'Backup/export',
                value: 'Not available',
                tone: 'neutral',
                description: 'Backup and export options may be added after local persistence exists.',
            },
        ],
    },
] satisfies [SettingsSection, ...SettingsSection[]];
