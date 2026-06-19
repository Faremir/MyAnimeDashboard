import { type AnimeRepository, animeRepository } from '@lib/modules/anime';
import { type SortDirection } from '@lib/shared/utils/search';
import { compareDates, compareNumbers, compareStrings, normalizeSearchQuery } from '@lib/shared/utils/search';

import { mockLibrary } from './library.mock';
import type {
    LibraryEntryReference,
    LibraryEntryView,
    LibraryOrderBy,
    LibraryQuery,
    LibraryQueryResult,
} from './library.types';

class LibraryRepositoryImpl implements LibraryRepository {
    public constructor(
        private readonly animeRepository: AnimeRepository,
        private readonly libraryItems: LibraryEntryReference[],
    ) {}

    public findMany(query: LibraryQuery = {}): LibraryQueryResult {
        const {
            status = null,
            search = '',
            orderBy = 'title',
            orderDirection = 'asc',
            page = 1,
            pageSize = 20,
        } = query;

        const normalizedSearch = normalizeSearchQuery(search);

        let resultItemsList: LibraryEntryView[] = this.hydrateLibraryItems();

        if (status) {
            resultItemsList = resultItemsList.filter((entry) => entry.status === status);
        }

        if (normalizedSearch) {
            resultItemsList = resultItemsList.filter((entry) => {
                const title = entry.anime.title.toLowerCase();
                const titleEnglish = entry.anime.titleEnglish?.toLowerCase() ?? '';

                return title.includes(normalizedSearch) || titleEnglish.includes(normalizedSearch);
            });
        }

        resultItemsList = this.sortLibraryItems(resultItemsList, orderBy, orderDirection);

        const total = resultItemsList.length;
        const offset = (page - 1) * pageSize;

        return {
            items: resultItemsList.slice(offset, offset + pageSize),
            total,
            page,
            pageSize,
        };
    }

    private hydrateLibraryItems() {
        return this.libraryItems.map((entry) => ({
            ...entry,
            anime: this.animeRepository.getAnime(entry.animeId),
        }));
    }

    private sortLibraryItems(
        items: LibraryEntryView[],
        orderBy: LibraryOrderBy,
        direction: SortDirection,
    ): LibraryEntryView[] {
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
    }
}

/**
 * Query boundary for library entries.
 *
 * The repository currently hydrates seed references with anime records, and can
 * later move to persistent storage without changing page/component callers.
 */
export interface LibraryRepository {
    /**
     * Returns paged, filtered, sorted library entries hydrated for display.
     */
    findMany(query?: LibraryQuery): LibraryQueryResult;
}

/**
 * Shared library read model.
 */
export const libraryRepository = new LibraryRepositoryImpl(animeRepository, mockLibrary);
