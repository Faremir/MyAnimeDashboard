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
 *
 */
export interface SettingsRepository {
    /**
     *
     * @param sectionId
     */
    getSettingsSection(sectionId: NavigationItemId): SettingsSection;

    /**
     *
     */
    getDefaultSettingsSection(): SettingsSection;
}

export const settingsRepository = new SettingsRepositoryImpl();
