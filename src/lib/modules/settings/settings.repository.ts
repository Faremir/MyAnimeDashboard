import type { NavigationItemId } from '@lib/modules/navigation';

import { settingsConfig } from './settings.config';
import type { SettingsSection } from './settings.types';

class SettingsRepositoryImpl implements SettingsRepository {
    public getSettingsSection(sectionId: NavigationItemId): SettingsSection {
        const settingsSection = settingsConfig.find((section) => section.id === sectionId);
        if (!settingsSection) {
            throw new Error(`Settings section ${sectionId} not found.`);
        }
        return settingsSection;
    }

    public getDefaultSettingsSection(): SettingsSection {
        return settingsConfig[0];
    }
}

/**
 * Read boundary for settings screen metadata.
 *
 * Settings are static config for now, but this contract keeps SettingsPage away
 * from the storage or preference source that will exist later.
 */
export interface SettingsRepository {
    /**
     * Gets the settings section represented by a settings navigation item.
     */
    getSettingsSection(sectionId: NavigationItemId): SettingsSection;

    /**
     * Gets the first settings section used when no child item is active.
     */
    getDefaultSettingsSection(): SettingsSection;
}

/**
 * Shared settings read model.
 */
export const settingsRepository = new SettingsRepositoryImpl();
