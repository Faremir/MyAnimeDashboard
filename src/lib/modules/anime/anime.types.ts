/**
 * Stable MAD anime identifier.
 */
export type AnimeId = number;

/**
 * Provider identifiers used to match MAD anime records with external sources.
 */
export type ExternalAnimeIds = {
    malId?: number;
    anilistId?: number;
};

/**
 * Normalized anime media type.
 */
export type AnimeMediaType = 'tv' | 'tv_special' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'unknown';

/**
 * Normalized anime airing lifecycle state.
 */
export type AnimeAiringStatus = 'finished_airing' | 'currently_airing' | 'not_yet_aired' | 'unknown';

/**
 * Normalized anime audience rating.
 */
export type AnimeAgeRating = 'g' | 'pg' | 'pg_13' | 'r_17' | 'r_plus' | 'rx' | 'unknown';

/**
 * Anime broadcast season.
 */
export type AnimeSeason = 'spring' | 'summer' | 'fall' | 'winter';

/**
 * Normalized source material category.
 */
export type AnimeSource =
    | 'manga'
    | 'light_novel'
    | 'visual_novel'
    | 'game'
    | 'original'
    | 'novel'
    | 'web_manga'
    | 'other'
    | 'unknown';
/**
 * Relationship between two anime records.
 */
export type AnimeRelationType =
    | 'prequel'
    | 'sequel'
    | 'parent_story'
    | 'side_story'
    | 'summary'
    | 'alternative_version'
    | 'alternative_setting'
    | 'spin_off'
    | 'adaptation'
    | 'character'
    | 'other';

/**
 * Provider-neutral anime record used by MAD modules.
 *
 * External provider shapes should be mapped into this type before reaching
 * repositories, actions, or UI components.
 */
export type Anime = {
    id: AnimeId;
    externalIds: ExternalAnimeIds;

    title: string;
    titleEnglish?: string;
    titleJapanese?: string;
    synonyms?: string[];

    mediaType: AnimeMediaType;
    episodes?: number;
    airingStatus: AnimeAiringStatus;

    releaseDate?: Date;
    season?: AnimeSeason;

    source: AnimeSource;
    genres: string[];

    ageRating: AnimeAgeRating;

    coverImage?: string;
    bannerImage?: string;
    synopsis?: string;

    publicScore?: number;
    relations: RelatedAnimeReference[];
};

/**
 * Lightweight relation stored on an anime record.
 */
export type RelatedAnimeReference = {
    relationType: AnimeRelationType;
    animeId: AnimeId;
};

/**
 * Relation view model hydrated with the referenced anime record.
 */
export type RelatedAnimeView = {
    relationType: AnimeRelationType;
    anime: Anime;
};
