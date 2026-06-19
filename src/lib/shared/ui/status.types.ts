/**
 * Visual tone used by shared status rows.
 */
export type StatusTone = 'good' | 'warning' | 'neutral';

/**
 * Generic status-row view model for dashboard and settings summaries.
 */
export type StatusItem = {
    label: string;
    value: string;
    tone: StatusTone;
    description?: string;
};
