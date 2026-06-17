import type { LibraryStatus } from '@lib/modules/library';
import type { StatusItem } from '@lib/shared/ui/status.types';

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
