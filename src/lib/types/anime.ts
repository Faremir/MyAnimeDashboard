export type AnimeId = number;

export type ExternalAnimeIds = {
    malId?: number;
    anilistId?: number;
};

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

export type RelatedAnime = {
    relationType: AnimeRelationType;
    animeId: AnimeId;
};

export type AnimeMediaType = | 'tv' | 'tv_special' | 'movie' | 'ova' | 'ona' | 'special' | 'music' | 'unknown';
export type AnimeAiringStatus = | 'finished_airing' | 'currently_airing' | 'not_yet_aired' | 'unknown';
export type AnimeAgeRating = | 'g' | 'pg' | 'pg_13' | 'r_17' | 'r_plus' | 'rx' | 'unknown';
export type AnimeSeason = | 'spring' | 'summer' | 'fall' | 'winter';
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
    relations: RelatedAnime[];
};