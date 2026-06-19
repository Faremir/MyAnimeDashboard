import type { AnimeId } from '@lib/modules/anime';

import type { LibraryStateAction } from './library.types';

class LibraryActionsImpl implements LibraryActions {
    public applyActionToLibraryState(animeId: AnimeId, action: LibraryStateAction): void {
        console.info('Update Library status on Anime:', {
            animeId,
            action,
        });
    }
}

/**
 * Public command API for library watch-state intent.
 *
 * The current implementation is temporary, but this boundary will own local
 * library mutations and future sync coordination.
 */
export interface LibraryActions {
    /**
     * Applies a user watch-state command to an anime's library entry.
     */
    applyActionToLibraryState(animeId: AnimeId, action: LibraryStateAction): void;
}

/**
 * Shared library command object used by watch-state controls.
 */
export const libraryActions = new LibraryActionsImpl();
