import type { SettingsSection } from './settings.types';

/**
 * Static settings screen metadata.
 *
 * Real persisted preferences should be introduced behind SettingsRepository
 * rather than read directly from components.
 */
export const settingsConfig = [
    {
        id: 'settings-account-sync',
        title: 'Account and sync',
        description: 'Future account connection and user library synchronization settings.',
        items: [
            {
                label: 'AniList library sync',
                value: 'Planned',
                tone: 'warning',
                description: 'AniList account sync is planned for user library state.',
            },
            {
                label: 'MyAnimeList library sync',
                value: 'Planned',
                tone: 'warning',
                description: 'MyAnimeList account sync is planned for user library state.',
            },
            {
                label: 'Primary library source',
                value: 'Not configured',
                tone: 'neutral',
                description: 'Users will later choose which connected account is the primary library source.',
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
        ],
    },
] satisfies [SettingsSection, ...SettingsSection[]];
