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
 * Public command API for anime-specific application intent.
 *
 * Components call these actions instead of mutating AnimeStore directly, so
 * later episode or detail-page coordination can be added behind this boundary.
 */
export interface AnimeActions {
    /**
     * Opens the standalone anime page for the selected anime.
     */
    openAnimePage(animeId: AnimeId): void;

    /**
     * Closes the standalone anime page and restores section-based rendering.
     */
    closeAnimePage(): void;
}

/**
 * Shared anime command object used by pages and cross-module components.
 */
export const animeActions = new AnimeActionsImpl(animeStore);
