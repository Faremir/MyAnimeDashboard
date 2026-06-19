import type { AnimeId } from '@lib/modules/anime';

import { type LibraryRepository, libraryRepository } from './library.repository';
import type { LibraryStateAction } from './library.types';

class LibraryActionsImpl implements LibraryActions {
    public constructor(private readonly libraryRepository: LibraryRepository) {}

    public applyActionToLibraryState(animeId: AnimeId, action: LibraryStateAction): void {
        const currentStatus = this.libraryRepository.findLibraryStatusByAnimeId(animeId);

        if (action === 'watch' && currentStatus === undefined) {
            this.libraryRepository.addLibraryEntry(animeId, 'watching');
        } else if (currentStatus === undefined) {
            throw new Error(`Action ${action} is not supported!`);
        } else if (action === 'watch' && currentStatus === 'planned') {
            this.libraryRepository.setLibraryEntryStatus(animeId, 'watching');
        } else if (action === 'resume' && currentStatus === 'paused') {
            this.libraryRepository.setLibraryEntryStatus(animeId, 'watching');
        } else if (action === 'pause' && currentStatus === 'watching') {
            this.libraryRepository.setLibraryEntryStatus(animeId, 'paused');
        } else if (action === 'drop' && ['planned', 'watching', 'paused'].includes(currentStatus)) {
            this.libraryRepository.setLibraryEntryStatus(animeId, 'dropped');
        } else if (action === 'restart' && ['completed', 'dropped'].includes(currentStatus)) {
            this.libraryRepository.restartLibraryEntry(animeId);
        } else {
            throw new Error(`Action ${action} is not supported!`);
        }
    }
}

/**
 * Public command API for library watch-state intent.
 *
 * Actions translate user-facing commands into repository mutations. Future MAL
 * sync, conflict handling, and failure reporting should be coordinated behind
 * this boundary rather than from components.
 */
export interface LibraryActions {
    /**
     * Applies a user watch-state command to the local library entry for an anime.
     */
    applyActionToLibraryState(animeId: AnimeId, action: LibraryStateAction): void;
}

/**
 * Shared library command object used by watch-state controls.
 */
export const libraryActions = new LibraryActionsImpl(libraryRepository);
