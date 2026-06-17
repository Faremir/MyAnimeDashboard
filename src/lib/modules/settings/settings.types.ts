import type { SettingsNavigationItemId } from '@lib/modules/navigation';
import type { StatusItem } from '@lib/shared/ui/status.types';

export type SettingsSectionId = SettingsNavigationItemId;

export type SettingsSection = {
    id: SettingsSectionId;
    title: string;
    description: string;
    items: StatusItem[];
};
