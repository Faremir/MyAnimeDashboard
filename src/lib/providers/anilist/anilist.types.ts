/**
 * AniList title object returned by Media queries.
 */
export type AnilistTitle = {
    romaji?: string | null;
    english?: string | null;
    native?: string | null;
};

/**
 * AniList fuzzy date object.
 *
 * AniList can return partial dates, so mappers must only construct Date values
 * when year, month, and day are all present.
 */
export type AnilistDate = {
    year?: number | null;
    month?: number | null;
    day?: number | null;
};

/**
 * AniList cover image variants returned by Media queries.
 */
export type AnilistCoverImage = {
    extraLarge?: string | null;
    large?: string | null;
    medium?: string | null;
};

/**
 * AniList anime media fields needed by MAD's provider-neutral AnimeMetadata.
 *
 * This is a DTO contract for GraphQL selection sets, not a domain model. Keep
 * provider-only details here so Anime, Library, and Schedule never depend on
 * AniList response shapes directly.
 */
export type AnilistAnime = {
    id: number;
    idMal?: number | null;
    title: AnilistTitle;
    synonyms?: string[] | null;
    format?: string | null;
    status?: string | null;
    episodes?: number | null;
    startDate?: AnilistDate | null;
    season?: string | null;
    isAdult?: boolean | null;
    coverImage?: AnilistCoverImage | null;
};

/**
 * AniList relation edge returned from Media.relations.
 *
 * The node type is optional in the DTO because GraphQL only returns fields the
 * client requests. Relation mappers should ignore edges that do not confirm an
 * ANIME node.
 */
export type AnilistAnimeRelation = {
    relationType?: string | null;
    node?: (AnilistAnime & { type?: string | null }) | null;
};

/**
 * AniList airing schedule node used for concrete episode air dates.
 *
 * mediaId is optional because top-level AiringSchedule queries can request
 * media { id idMal } instead. The mapper supports both shapes.
 */
export type AnilistEpisodeAiringSchedule = {
    id: number;
    airingAt: number;
    episode: number;
    mediaId?: number | null;
    media?: Pick<AnilistAnime, 'id' | 'idMal'> | null;
};
