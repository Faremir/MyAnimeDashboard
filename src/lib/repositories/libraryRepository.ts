import {mockLibraryListItems} from '@lib/mock/library';

import type {
    AnimeLibraryListItem,
    LibraryStatus,
} from '@lib/types/library';

export const libraryRepository = {
    list(): AnimeLibraryListItem[] {
        return mockLibraryListItems;
    },

    listByStatus(status: LibraryStatus): AnimeLibraryListItem[] {
        return mockLibraryListItems.filter((entry) => entry.status === status);
    },
};