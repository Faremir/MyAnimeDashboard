import { type AnimeId, type AnimeRepository, animeRepository } from '@lib/modules/anime';
import { type SortDirection } from '@lib/shared/utils/search';
import { compareDates, compareNumbers, compareStrings, normalizeSearchQuery } from '@lib/shared/utils/search';

import { mockLibrary } from './library.mock';
import { type LibraryStore, libraryStore } from './library.state.svelte';
import type {
    LibraryEntryId,
    LibraryEntryReference,
    LibraryEntryView,
    LibraryOrderBy,
    LibraryQuery,
    LibraryQueryResult,
    LibraryStatus,
} from './library.types';

class LibraryRepositoryImpl implements LibraryRepository {
    private readonly libraryItems: LibraryEntryReference[];

    public constructor(
        private readonly store: LibraryStore,
        private readonly animeRepository: AnimeRepository,
        libraryItems: LibraryEntryReference[],
    ) {
        this.libraryItems = libraryItems.map((entry) => this.cloneEntry(entry));
    }

    public static sortLibraryEntryViews(
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

    public queryLibraryEntryViews(query: LibraryQuery = {}): LibraryQueryResult {
        const {
            status = null,
            search = '',
            orderBy = 'title',
            orderDirection = 'asc',
            page = 1,
            pageSize = 20,
        } = query;

        this.store.getLibraryRevision();
        let resultItemsList: LibraryEntryView[] = this.hydrateReferences();

        if (status) {
            resultItemsList = resultItemsList.filter((entry) => entry.status === status);
        }

        const normalizedSearch = normalizeSearchQuery(search);
        if (normalizedSearch) {
            resultItemsList = resultItemsList.filter((entry) => {
                const title = entry.anime.title.toLowerCase();
                const titleEnglish = entry.anime.titleEnglish?.toLowerCase() ?? '';

                return title.includes(normalizedSearch) || titleEnglish.includes(normalizedSearch);
            });
        }

        resultItemsList = LibraryRepositoryImpl.sortLibraryEntryViews(resultItemsList, orderBy, orderDirection);

        const total = resultItemsList.length;
        const offset = (page - 1) * pageSize;

        return {
            items: resultItemsList.slice(offset, offset + pageSize),
            total,
            page,
            pageSize,
        };
    }

    public getAllLibraryEntryViews(): LibraryEntryView[] {
        this.store.getLibraryRevision();
        return this.hydrateReferences();
    }

    public findLibraryStatusByAnimeId(animeId: AnimeId): LibraryStatus | undefined {
        this.store.getLibraryRevision();
        return this.libraryItems.find((entry) => entry.animeId === animeId)?.status;
    }

    public addLibraryEntry(animeId: AnimeId, status: LibraryStatus): void {
        const existingEntry = this.findLibraryEntry(animeId);

        if (existingEntry) {
            throw new Error(`Library Entry already exists`);
        }

        const newLibraryEntry = this.createLibraryEntry(animeId, status);
        this.libraryItems.push(newLibraryEntry);

        this.store.incrementLibraryRevision();
    }

    public setLibraryEntryStatus(animeId: AnimeId, status: LibraryStatus): void {
        const existingEntry = this.getMutableLibraryEntry(animeId);

        existingEntry.status = status;
        existingEntry.updatedAt = new Date();

        this.store.incrementLibraryRevision();
    }

    public setLibraryEntryEpisode(animeId: AnimeId, episodeNumber: number): void {
        const existingEntry = this.getMutableLibraryEntry(animeId);

        existingEntry.progress = episodeNumber;
        existingEntry.updatedAt = new Date();

        this.store.incrementLibraryRevision();
    }

    public restartLibraryEntry(animeId: AnimeId): void {
        const existingEntry = this.getMutableLibraryEntry(animeId);

        existingEntry.status = 'watching';
        existingEntry.progress = 0;
        existingEntry.updatedAt = new Date();

        this.store.incrementLibraryRevision();
    }

    private getNextEntryId(): LibraryEntryId {
        return this.libraryItems.reduce((nextId, entry) => Math.max(nextId, entry.id + 1), 1);
    }

    private getMutableLibraryEntry(animeId: AnimeId): LibraryEntryReference {
        const entry = this.findLibraryEntry(animeId);
        if (!entry) {
            throw new Error(`Anime not found in Library!`);
        }
        return entry;
    }

    private findLibraryEntry(animeId: AnimeId): LibraryEntryReference | undefined {
        return this.libraryItems.find((entry) => entry.animeId === animeId);
    }

    private createLibraryEntry(animeId: AnimeId, status: LibraryStatus): LibraryEntryReference {
        const currentDate = new Date();
        return {
            id: this.getNextEntryId(),
            animeId,
            status,
            progress: 0,
            addedAt: this.cloneDate(currentDate),
            updatedAt: this.cloneDate(currentDate),
        };
    }

    /**
     * Builds component-facing views from repository-owned records.
     *
     * The cloned reference keeps components from mutating the repository's
     * working set, while the anime relation is resolved through AnimeRepository.
     */
    private hydrateReferences(): LibraryEntryView[] {
        return this.libraryItems.map((entry) => ({
            ...this.cloneEntry(entry),
            anime: this.animeRepository.getAnime(entry.animeId),
        }));
    }

    private cloneEntry(entry: LibraryEntryReference): LibraryEntryReference {
        return {
            ...entry,
            addedAt: this.cloneDate(entry.addedAt),
            updatedAt: this.cloneDate(entry.updatedAt),
        };
    }

    private cloneDate(date: Date): Date {
        return new Date(date);
    }
}

/**
 * Source-of-truth boundary for library entries.
 *
 * The repository owns the current mutable library working set, hides the
 * seed/mock data source, and increments LibraryStore's revision after
 * mutations so Svelte queries can update. Later persistent storage should be
 * introduced behind this same contract.
 */
export interface LibraryRepository {
    /**
     * Returns paged, filtered, sorted library entries hydrated for display.
     */
    queryLibraryEntryViews(query?: LibraryQuery): LibraryQueryResult;

    /**
     * Returns every library entry hydrated for display.
     */
    getAllLibraryEntryViews(): LibraryEntryView[];

    /**
     * Finds the locally owned library status for an anime.
     *
     * Undefined means the anime is not currently represented in the local
     * library.
     */
    findLibraryStatusByAnimeId(animeId: AnimeId): LibraryStatus | undefined;

    /**
     * Adds an anime to the local library with the provided starting status.
     */
    addLibraryEntry(animeId: AnimeId, status: LibraryStatus): void;

    /**
     * Updates the local watch status for an existing library entry.
     */
    setLibraryEntryStatus(animeId: AnimeId, status: LibraryStatus): void;

    /**
     * Updates the watched episode progress for an existing library entry.
     */
    setLibraryEntryEpisode(animeId: AnimeId, episodeNumber: number): void;

    /**
     * Starts an existing library entry over from episode zero.
     */
    restartLibraryEntry(animeId: AnimeId): void;
}

/**
 * Shared library source-of-truth repository.
 */
export const libraryRepository = new LibraryRepositoryImpl(libraryStore, animeRepository, mockLibrary);
