import { mockAnime } from './anime.mock';
import type { Anime, AnimeId, RelatedAnimeView } from './anime.types';

class AnimeRepositoryImpl implements AnimeRepository {
    public constructor(private readonly animeItems: Anime[]) {}

    public findAnime(animeId: AnimeId): Anime | undefined {
        return this.animeItems.find((anime) => anime.id === animeId);
    }

    public getAnime(animeId: AnimeId): Anime {
        const anime = this.findAnime(animeId);

        if (!anime) {
            throw new Error(`Anime with id ${animeId} was not found.`);
        }

        return anime;
    }

    public getRelations(animeId: AnimeId): RelatedAnimeView[] {
        const anime = this.getAnime(animeId);

        return anime.relations.map((relation) => ({
            relationType: relation.relationType,
            anime: this.getAnime(relation.animeId),
        }));
    }
}

/**
 * Read boundary for anime records.
 *
 * Callers depend on this contract rather than on mock seed data, local storage,
 * or future provider imports.
 */
export interface AnimeRepository {
    /**
     * Finds an anime record when the caller can handle a missing result.
     */
    findAnime(animeId: AnimeId): Anime | undefined;

    /**
     * Gets an anime record or throws when module data is internally inconsistent.
     */
    getAnime(animeId: AnimeId): Anime;

    /**
     * Hydrates relation references into anime view models for detail rendering.
     */
    getRelations(animeId: AnimeId): RelatedAnimeView[];
}

/**
 * Shared anime read model.
 */
export const animeRepository = new AnimeRepositoryImpl(mockAnime);
