import type {
    AnimeAiringStatus,
    AnimeMediaType,
    AnimeMetadata,
    AnimeRelationMetadata,
    AnimeRelationType,
    AnimeSeason,
} from '@lib/modules/anime';
import type { EpisodeScheduleMetadata } from '@lib/modules/schedule';

import type { ExternalIdentity, ProviderMappedValue } from '../provider.types';
import type { AnilistAnime, AnilistAnimeRelation, AnilistDate, AnilistEpisodeAiringSchedule } from './anilist.types';

/**
 * Maps AniList Media data into MAD's provider-neutral anime metadata and
 * provider-owned matching identities.
 *
 * The mapper is intentionally lossy: it keeps fields MAD needs for identity,
 * navigation, schedule, and library workflows, while leaving AniList-specific
 * response structure inside the provider layer.
 */
export const mapAnilistAnimeMetadata = (media: AnilistAnime): ProviderMappedValue<AnimeMetadata> => {
    return {
        value: {
            anilistReferenceId: media.id,
            malReferenceId: media.idMal ?? undefined,
            title: media.title?.romaji ?? media.title?.english ?? media.title?.native ?? 'Untitled anime',
            titleEnglish: media.title?.english ?? undefined,
            titleNative: media.title?.native ?? undefined,
            synonyms: media.synonyms?.filter((synonym): synonym is string => Boolean(synonym)),
            mediaType: mapAnilistMediaType(media.format),
            episodes: media.episodes ?? undefined,
            airingStatus: mapAnilistAiringStatus(media.status),
            releaseDate: mapAnilistDate(media.startDate),
            season: mapAnilistSeason(media.season),
            isAdult: media.isAdult ?? false,
            coverImage:
                media.coverImage?.extraLarge ?? media.coverImage?.large ?? media.coverImage?.medium ?? undefined,
        },
        externalIdentities: createAnimeExternalIdentities(media.id, media.idMal),
    };
};

/**
 * Maps AniList anime relation edges into provider-neutral relation metadata and
 * target-anime matching identities.
 *
 * AniList relations can point to manga and other media. MAD's current relation
 * model links anime records only, so edges without node.type === 'ANIME' are
 * deliberately ignored.
 */
export const mapAnilistAnimeRelationMetadata = (
    edges: AnilistAnimeRelation[],
): ProviderMappedValue<AnimeRelationMetadata>[] => {
    return edges.flatMap((edge) => {
        if (!edge?.node || edge.node.type !== 'ANIME') {
            return [];
        }

        const node = edge.node;

        return {
            value: {
                relationType: mapAnilistRelationType(edge.relationType),
                title: node.title?.romaji ?? node.title?.english ?? node.title?.native ?? undefined,
            },
            externalIdentities: createAnimeExternalIdentities(node.id, node.idMal),
        };
    });
};

/**
 * Maps an AniList airing schedule node into MAD's provider-neutral schedule
 * import shape and provider-owned matching identities.
 *
 * MAD imports concrete schedule entries from the top-level AniList schedule
 * query, using the AniList airing schedule ID for schedule matching and the
 * nested media IDs for anime matching.
 */
export const mapAnilistAiringSchedule = (
    node: AnilistEpisodeAiringSchedule,
): ProviderMappedValue<EpisodeScheduleMetadata> => {
    return {
        value: {
            episodeNumber: node.episode,
            airDateTime: new Date(node.airingAt * 1000),
        },
        externalIdentities: [
            ...createScheduleAiringExternalIdentities(node.id),
            ...createAnimeExternalIdentities(node.media?.id, node.media?.idMal),
        ],
    };
};

const createAnimeExternalIdentities = (
    anilistId: number | null | undefined,
    malId: number | null | undefined,
): ExternalIdentity[] => {
    return [
        createExternalIdentity('anilist', 'anime', anilistId),
        createExternalIdentity('myanimelist', 'anime', malId),
    ].filter((identity): identity is ExternalIdentity => identity !== undefined);
};

const createScheduleAiringExternalIdentities = (
    anilistAiringScheduleId: number | null | undefined,
): ExternalIdentity[] => {
    return [createExternalIdentity('anilist', 'schedule-airing', anilistAiringScheduleId)].filter(
        (identity): identity is ExternalIdentity => identity !== undefined,
    );
};

const createExternalIdentity = (
    sourceId: ExternalIdentity['sourceId'],
    entityKind: ExternalIdentity['entityKind'],
    value: number | string | null | undefined,
): ExternalIdentity | undefined => {
    if (value === null || value === undefined) {
        return undefined;
    }

    return {
        sourceId,
        entityKind,
        value: String(value),
    };
};

const mapAnilistMediaType = (format: string | null | undefined): AnimeMediaType => {
    switch (format) {
        case 'TV':
        case 'TV_SHORT':
            return 'tv';
        case 'MOVIE':
            return 'movie';
        case 'OVA':
            return 'ova';
        case 'ONA':
            return 'ona';
        case 'SPECIAL':
            return 'special';
        case 'MUSIC':
            return 'music';
        default:
            return 'unknown';
    }
};

const mapAnilistAiringStatus = (status: string | null | undefined): AnimeAiringStatus => {
    switch (status) {
        case 'FINISHED':
            return 'finished';
        case 'RELEASING':
            return 'releasing';
        case 'NOT_YET_RELEASED':
            return 'not_yet_released';
        default:
            return 'unknown';
    }
};

const mapAnilistSeason = (season: string | null | undefined): AnimeSeason | undefined => {
    switch (season) {
        case 'SPRING':
            return 'spring';
        case 'SUMMER':
            return 'summer';
        case 'FALL':
            return 'fall';
        case 'WINTER':
            return 'winter';
        default:
            return undefined;
    }
};

const mapAnilistDate = (date: AnilistDate | null | undefined): Date | undefined => {
    if (!date?.year || !date.month || !date.day) {
        return undefined;
    }

    // AniList dates are date-only values, so construct them in local time
    // instead of treating them as UTC instants.
    return new Date(date.year, date.month - 1, date.day);
};

const mapAnilistRelationType = (relationType: string | null | undefined): AnimeRelationType => {
    switch (relationType) {
        case 'PREQUEL':
            return 'prequel';
        case 'SEQUEL':
            return 'sequel';
        case 'PARENT':
            return 'parent_story';
        case 'SIDE_STORY':
            return 'side_story';
        case 'SUMMARY':
            return 'summary';
        case 'ALTERNATIVE':
            return 'alternative_version';
        case 'SPIN_OFF':
            return 'spin_off';
        case 'ADAPTATION':
            return 'adaptation';
        case 'CHARACTER':
            return 'character';
        default:
            return 'other';
    }
};
