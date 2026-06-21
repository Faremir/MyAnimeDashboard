import type { AnilistAiringScheduleQuery, AnilistAnimeDetailQuery } from './anilist.generated';

/**
 * AniList Media object returned by the anime detail query.
 *
 * This is generated from MAD's GraphQL operation selection set. Keep provider
 * DTO aliases here so mappers do not depend on the huge generated schema types
 * directly.
 */
export type AnilistAnime = NonNullable<AnilistAnimeDetailQuery['Media']>;

/**
 * AniList fuzzy date object returned by Media.startDate.
 *
 * AniList can return partial dates, so mappers must only construct Date values
 * when year, month, and day are all present.
 */
export type AnilistDate = NonNullable<AnilistAnime['startDate']>;

/**
 * AniList relation edge returned by Media.relations.edges.
 *
 * Relation nodes may be null, and MAD only maps relation edges that point to
 * anime media.
 */
export type AnilistAnimeRelation = NonNullable<NonNullable<AnilistAnime['relations']>['edges']>[number];

/**
 * AniList airing schedule node returned by the schedule query.
 *
 * This is the provider DTO used before MAD matches the schedule entry to local
 * anime and schedule records.
 */
export type AnilistEpisodeAiringSchedule = NonNullable<
    NonNullable<NonNullable<AnilistAiringScheduleQuery['Page']>['airingSchedules']>[number]
>;
