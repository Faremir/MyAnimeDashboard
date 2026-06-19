import type { SettingsNavigationItemId } from '@lib/modules/navigation';
import type { StatusItem } from '@lib/shared/ui/status.types';

/**
 * Settings sections are addressed by settings child navigation items.
 */
export type SettingsSectionId = SettingsNavigationItemId;

/**
 * Static settings section metadata rendered by SettingsPage.
 */
export type SettingsSection = {
    id: SettingsSectionId;
    title: string;
    description: string;
    items: StatusItem[];
};
