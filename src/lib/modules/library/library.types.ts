import type { Anime, AnimeId } from '@lib/modules/anime';
import type { SortDirection } from '@lib/shared/utils/search';

/**
 * Stable MAD library entry identifier.
 */
export type LibraryEntryId = number;

/**
 * Local MAD watch-state value.
 */
export type LibraryStatus = 'planned' | 'watching' | 'paused' | 'dropped' | 'completed';

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
 * This is the in-app/offline representation of watch state. Later sync can reconcile it with the user-selected
 * primary AniList or MyAnimeList source.
 */
export type LibraryEntry = {
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
export type LibraryEntryView = LibraryEntry & {
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
