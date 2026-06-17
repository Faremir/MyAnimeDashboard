import type { LibraryStatus } from '@lib/types/library';

export type DashboardTone = 'good' | 'warning' | 'neutral';

export type DashboardLibraryStat = {
    label: string;
    value: number;
    status: LibraryStatus;
};

export type DashboardMetric = {
    label: string;
    value: number;
};

export type DashboardStatusItem = {
    label: string;
    value: string;
    tone: DashboardTone;
};

export type DashboardSummary = {
    libraryStats: DashboardLibraryStat[];
    scheduleMetrics: DashboardMetric[];
    attentionItems: DashboardStatusItem[];
    systemItems: DashboardStatusItem[];
};
