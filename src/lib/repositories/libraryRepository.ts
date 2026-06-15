import {mockLibraryListItems} from '@lib/mock/library';

import type {
    AnimeLibraryListItem,
    LibraryStatus,
} from '@lib/types/library';

export type LibraryOrderBy =
    | 'dateAdded'
    | 'dateUpdated'
    | 'title'
    | 'releaseDate';

export type SortDirection = 'asc' | 'desc';

export type LibraryQuery = {
    status?: LibraryStatus | null;
    search?: string;
    orderBy?: LibraryOrderBy;
    orderDirection?: SortDirection;
    page?: number;
    pageSize?: number;
};

export type LibraryQueryResult = {
    items: AnimeLibraryListItem[];
    total: number;
    page: number;
    pageSize: number;
};

const normalizeSearch = (value: string): string => {
    return value.trim().toLowerCase();
};

const compareString = (
    left: string,
    right: string,
    direction: SortDirection,
): number => {
    const result = left.localeCompare(right);

    return direction === 'asc' ? result : -result;
};

const compareNumber = (
    left: number,
    right: number,
    direction: SortDirection,
): number => {
    const result = left - right;

    return direction === 'asc' ? result : -result;
};

const sortLibraryItems = (
    items: AnimeLibraryListItem[],
    orderBy: LibraryOrderBy,
    direction: SortDirection,
): AnimeLibraryListItem[] => {
    return [...items].sort((left, right) => {
        if (orderBy === 'title') {
            return compareString(left.anime.title, right.anime.title, direction);
        }


        if (orderBy === 'releaseDate') {
            return compareNumber(left.anime.releaseDate?.getTime() ?? 0, right.anime.releaseDate?.getTime() ?? 0, direction);
        }

        if (orderBy === 'dateAdded') {
            return compareNumber(left.addedAt.getTime(), right.addedAt.getTime(), direction);
        }

        return compareNumber(left.updatedAt.getTime(), right.updatedAt.getTime(), direction);
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

        const normalizedSearch = normalizeSearch(search);

        let items = mockLibraryListItems;

        if (status) {
            items = items.filter((entry) => entry.status === status);
        }

        if (normalizedSearch) {
            items = items.filter((entry) => {
                const title = entry.anime.title.toLowerCase();
                const titleEnglish = entry.anime.titleEnglish?.toLowerCase() ?? '';

                return (
                    title.includes(normalizedSearch) ||
                    titleEnglish.includes(normalizedSearch)
                );
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