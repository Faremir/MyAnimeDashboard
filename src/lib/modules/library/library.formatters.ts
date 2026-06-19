import { formatLabel, type LabelMap } from '@lib/shared/utils/label';

import type { LibraryStatus } from './library.types';

/**
 * Display labels for local library status values.
 */
export const libraryStatusLabels = {
    watching: 'Watching',
    completed: 'Completed',
    planned: 'Plan to Watch',
    dropped: 'Dropped',
    paused: 'Paused',
} satisfies LabelMap<LibraryStatus>;

export { formatLabel };
