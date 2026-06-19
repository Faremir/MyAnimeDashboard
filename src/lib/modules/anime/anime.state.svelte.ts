import type { AnimeId } from './anime.types';

/**
 *
 */
export class AnimeStore {
    /**
     *
     */
    public selectedAnimeId = $state<AnimeId | null>(null);

    /**
     *
     * @param animeId
     */
    public setSelectedAnimeId(animeId: AnimeId): void {
        this.selectedAnimeId = animeId;
    }

    /**
     *
     */
    public clearSelectedAnimeId(): void {
        this.selectedAnimeId = null;
    }
}

export const animeStore = new AnimeStore();
