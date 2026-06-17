import type { StatusItem } from '@lib/types/status';

export type SettingsSectionId = 'account-sync' | 'providers' | 'schedule' | 'appearance' | 'local-data';

export type SettingsSection = {
    id: SettingsSectionId;
    title: string;
    description: string;
    items: StatusItem[];
};
