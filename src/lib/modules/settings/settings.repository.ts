import type { NavigationItemId } from '@lib/modules/navigation';

import { settingsSections } from './settings.config';
import type { SettingsSection, SettingsSectionId } from './settings.types';

const isSettingsSectionId = (sectionId: NavigationItemId): sectionId is SettingsSectionId => {
    return settingsSections.some((section) => section.id === sectionId);
};

export const settingsRepository = {
    findSettingsSection(sectionId: NavigationItemId): SettingsSection | undefined {
        if (!isSettingsSectionId(sectionId)) {
            return undefined;
        }

        return settingsSections.find((section) => section.id === sectionId);
    },

    getDefaultSettingsSection(): SettingsSection {
        return settingsSections[0];
    },
};
