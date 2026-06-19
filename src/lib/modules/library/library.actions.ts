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
 *
 */
export interface LibraryActions {
    /**
     *
     * @param animeId
     * @param action
     */
    applyActionToLibraryState(animeId: AnimeId, action: LibraryStateAction): void;
}

export const libraryActions = new LibraryActionsImpl();
