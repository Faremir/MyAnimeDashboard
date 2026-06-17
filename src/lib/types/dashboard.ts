import type { LibraryStatus } from '@lib/types/library';
import type { StatusItem } from '@lib/types/status';

export type DashboardLibraryStat = {
    label: string;
    value: number;
    status: LibraryStatus;
};

export type DashboardMetric = {
    label: string;
    value: number;
};

export type DashboardSummary = {
    libraryStats: DashboardLibraryStat[];
    scheduleMetrics: DashboardMetric[];
    attentionItems: StatusItem[];
    systemItems: StatusItem[];
};
