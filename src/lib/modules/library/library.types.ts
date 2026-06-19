import type { Anime, AnimeId } from '@lib/modules/anime';
import type { SortDirection } from '@lib/shared/utils/search';

/**
 * Stable MAD library entry identifier.
 */
export type LibraryEntryId = number;

/**
 * Local MAD watch-state value.
 */
export type LibraryStatus = 'watching' | 'completed' | 'planned' | 'dropped' | 'paused';

/**
 * User intent for changing local library watch state.
 */
export type LibraryStateAction = 'watch' | 'pause' | 'drop' | 'resume' | 'restart';

/**
 * Sort fields supported by the Library repository.
 */
export type LibraryOrderBy = 'dateAdded' | 'dateUpdated' | 'title' | 'releaseDate';

/**
 * Locally owned library record.
 *
 * This is the long-term source of truth for user watch state, even after MAL
 * sync and persistent storage are added.
 */
export type LibraryEntryReference = {
    id: LibraryEntryId;
    animeId: AnimeId;

    status: LibraryStatus;
    progress: number;
    score?: number;
    notes?: string;

    addedAt: Date;
    updatedAt: Date;
};

/**
 * Library record hydrated with anime metadata for rendering.
 */
export type LibraryEntryView = LibraryEntryReference & {
    anime: Anime;
};

/**
 * Query options accepted by the Library repository.
 */
export type LibraryQuery = {
    status?: LibraryStatus | null;
    search?: string;
    orderBy?: LibraryOrderBy;
    orderDirection?: SortDirection;
    page?: number;
    pageSize?: number;
};

/**
 * Paged Library repository result.
 */
export type LibraryQueryResult = {
    items: LibraryEntryView[];
    total: number;
    page: number;
    pageSize: number;
};
