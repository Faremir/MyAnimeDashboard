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
 *
 */
export interface AnimeRepository {
    /**
     *
     * @param animeId
     */
    findAnime(animeId: AnimeId): Anime | undefined;

    /**
     *
     * @param animeId
     */
    getAnime(animeId: AnimeId): Anime;

    /**
     *
     * @param animeId
     */
    getRelations(animeId: AnimeId): RelatedAnimeView[];
}

export const animeRepository = new AnimeRepositoryImpl(mockAnime);
