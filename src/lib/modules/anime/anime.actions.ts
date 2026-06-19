import { type AnimeStore, animeStore } from './anime.state.svelte';
import type { AnimeId } from './anime.types';

class AnimeActionsImpl implements AnimeActions {
    public constructor(private readonly store: AnimeStore) {}

    public openAnimePage(animeId: AnimeId): void {
        this.store.setSelectedAnimeId(animeId);
    }

    public closeAnimePage(): void {
        this.store.clearSelectedAnimeId();
    }
}

/**
 *
 */
export interface AnimeActions {
    /**
     *
     * @param animeId
     */
    openAnimePage(animeId: AnimeId): void;

    /**
     *
     */
    closeAnimePage(): void;
}

export const animeActions = new AnimeActionsImpl(animeStore);
