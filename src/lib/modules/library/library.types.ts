import type { Anime, AnimeId } from '@lib/modules/anime';
import type { SortDirection } from '@lib/shared/utils/search';

export type LibraryEntryId = number;
export type LibraryStatus = 'watching' | 'completed' | 'planned' | 'dropped' | 'paused';
export type LibraryStateAction = 'watch' | 'pause' | 'drop' | 'resume' | 'restart';
export type LibraryOrderBy = 'dateAdded' | 'dateUpdated' | 'title' | 'releaseDate';

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

export type LibraryEntryView = LibraryEntryReference & {
    anime: Anime;
};
export type LibraryQuery = {
    status?: LibraryStatus | null;
    search?: string;
    orderBy?: LibraryOrderBy;
    orderDirection?: SortDirection;
    page?: number;
    pageSize?: number;
};
export type LibraryQueryResult = {
    items: LibraryEntryView[];
    total: number;
    page: number;
    pageSize: number;
};
