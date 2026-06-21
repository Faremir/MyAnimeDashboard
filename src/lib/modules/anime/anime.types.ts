// Global contracts

/**
 * Stable MAD anime identifier.
 */
export type AnimeId = number;

/**
 * Normalized anime media type.
 */
export type AnimeMediaType = 'tv' | 'tv_special' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'unknown';

/**
 * Normalized anime airing lifecycle state.
 */
export type AnimeAiringStatus = 'finished' | 'releasing' | 'not_yet_released' | 'cancelled' | 'paused' | 'unknown';

/**
 * Anime broadcast season.
 */
export type AnimeSeason = 'spring' | 'summer' | 'fall' | 'winter';

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

// Provider-neutral contracts

/**
 * Provider-neutral anime facts normalized into MAD's domain language.
 *
 * This type deliberately excludes MAD-owned identity, local relations, library
 * state, schedule state, and episode/watch availability. Raw provider DTOs
 * should be mapped into this shape before data reaches Anime repositories,
 * Library, Schedule, or UI components.
 */
export type AnimeMetadata = {
    title: string;
    titleEnglish?: string;
    titleNative?: string;
    synonyms?: string[];

    malReferenceId?: number;
    anilistReferenceId?: number;

    mediaType: AnimeMediaType;
    episodes?: number;
    airingStatus: AnimeAiringStatus;

    releaseDate?: Date;
    season?: AnimeSeason;

    isAdult: boolean;

    coverImage?: string;
};

/**
 * Provider-neutral anime relation before MAD matches it to a local AnimeId.
 *
 * External providers can identify related anime by external IDs, but only
 * matched local Anime records can become RelatedAnimeReference values.
 */
export type AnimeRelationMetadata = {
    relationType: AnimeRelationType;
    title?: string;
};

// Local contracts

/**
 * Local MAD anime entity.
 *
 * Anime owns the stable MAD AnimeId and local anime-to-anime relations. External
 * provider data must be normalized into AnimeMetadata before it is used to
 * create or update this entity.
 */
export type Anime = AnimeMetadata & {
    id: AnimeId;
    relations: AnimeRelation[];
};

/**
 * Lightweight local relation between two MAD anime records.
 *
 * Relations use local AnimeId values, so they belong to persisted/matched Anime
 * entities and not to raw provider DTOs or unmatched discovery records.
 */
export type AnimeRelation = {
    relationType: AnimeRelationType;
    animeId: AnimeId;
};

// UI contracts

/**
 * Relation view model hydrated with the referenced anime record.
 */
export type AnimeRelationView = AnimeRelation & {
    anime: Anime;
};
