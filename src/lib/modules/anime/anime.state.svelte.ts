import type { AnimeId } from './anime.types';

/**
 * Owns anime module-global UI state.
 *
 * The app shell reads this state to decide when the standalone anime page
 * should replace the active navigation section.
 */
export class AnimeStore {
    /**
     * Selected anime for the standalone anime page.
     *
     * A null value means the main panel should render the active navigation
     * section instead.
     */
    public selectedAnimeId = $state<AnimeId | null>(null);

    /**
     * Switches the main panel into anime page mode for the provided anime.
     */
    public setSelectedAnimeId(animeId: AnimeId): void {
        this.selectedAnimeId = animeId;
    }

    /**
     * Clears anime page mode and returns rendering to section navigation.
     */
    public clearSelectedAnimeId(): void {
        this.selectedAnimeId = null;
    }
}

/**
 * Shared anime module state.
 */
export const animeStore = new AnimeStore();
