import type { SortDirection } from '@lib/shared/utils/search';
import { compareDates, compareNumbers, compareStrings, normalizeSearchQuery } from '@lib/shared/utils/search';

import { mockLibraryListItems } from './library.mock';
import type { AnimeLibraryListItem, LibraryOrderBy, LibraryQuery, LibraryQueryResult } from './library.types';

const sortLibraryItems = (
    items: AnimeLibraryListItem[],
    orderBy: LibraryOrderBy,
    direction: SortDirection,
): AnimeLibraryListItem[] => {
    return [...items].sort((left, right) => {
        if (orderBy === 'title') {
            return compareStrings(left.anime.title, right.anime.title, direction);
        }

        if (orderBy === 'releaseDate') {
            return compareNumbers(
                left.anime.releaseDate?.getTime() ?? 0,
                right.anime.releaseDate?.getTime() ?? 0,
                direction,
            );
        }

        if (orderBy === 'dateAdded') {
            return compareDates(left.addedAt, right.addedAt, direction);
        }

        return compareDates(left.updatedAt, right.updatedAt, direction);
    });
};

export const libraryRepository = {
    findMany(query: LibraryQuery = {}): LibraryQueryResult {
        const {
            status = null,
            search = '',
            orderBy = 'title',
            orderDirection = 'asc',
            page = 1,
            pageSize = 20,
        } = query;

        const normalizedSearch = normalizeSearchQuery(search);

        let items = mockLibraryListItems;

        if (status) {
            items = items.filter((entry) => entry.status === status);
        }

        if (normalizedSearch) {
            items = items.filter((entry) => {
                const title = entry.anime.title.toLowerCase();
                const titleEnglish = entry.anime.titleEnglish?.toLowerCase() ?? '';

                return title.includes(normalizedSearch) || titleEnglish.includes(normalizedSearch);
            });
        }

        items = sortLibraryItems(items, orderBy, orderDirection);

        const total = items.length;
        const offset = (page - 1) * pageSize;

        return {
            items: items.slice(offset, offset + pageSize),
            total,
            page,
            pageSize,
        };
    },
};
