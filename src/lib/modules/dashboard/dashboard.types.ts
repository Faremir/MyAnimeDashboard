import type { LibraryStatus } from '@lib/modules/library';
import type { StatusItem } from '@lib/shared/ui/status.types';

/**
 * Library status count rendered by the dashboard summary.
 */
export type DashboardLibraryStat = {
    label: string;
    value: number;
    status: LibraryStatus;
};

/**
 * Numeric schedule metric rendered by the dashboard summary.
 */
export type DashboardMetric = {
    label: string;
    value: number;
};

/**
 * Complete dashboard view model assembled from other module repositories.
 */
export type DashboardSummary = {
    libraryStats: DashboardLibraryStat[];
    scheduleMetrics: DashboardMetric[];
    attentionItems: StatusItem[];
    systemItems: StatusItem[];
};
