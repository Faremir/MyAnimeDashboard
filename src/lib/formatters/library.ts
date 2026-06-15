import type { LibraryStatus } from '@lib/types/library';

type LabelMap<T extends string> = Record<T, string>;

export const libraryStatusLabels = {
    watching: 'Watching',
    completed: 'Completed',
    planned: 'Plan to Watch',
    dropped: 'Dropped',
    paused: 'Paused',
} satisfies LabelMap<LibraryStatus>;

export const formatLabel = <T extends string>(labels: LabelMap<T>, value: T): string => labels[value];
