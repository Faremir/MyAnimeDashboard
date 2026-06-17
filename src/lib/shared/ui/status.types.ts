export type StatusTone = 'good' | 'warning' | 'neutral';

export type StatusItem = {
    label: string;
    value: string;
    tone: StatusTone;
    description?: string;
};
