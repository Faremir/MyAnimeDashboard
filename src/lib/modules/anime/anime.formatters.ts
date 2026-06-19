import { formatLabel, type LabelMap } from '@lib/shared/utils/label';

import type {
    AnimeAgeRating,
    AnimeAiringStatus,
    AnimeMediaType,
    AnimeRelationType,
    AnimeSeason,
    AnimeSource,
} from './anime.types';

/**
 * Display labels for anime media type values.
 */
export const animeMediaTypeLabels = {
    tv: 'TV',
    tv_special: 'TV Special',
    movie: 'Movie',
    ova: 'OVA',
    ona: 'ONA',
    special: 'Special',
    music: 'Music',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeMediaType>;

/**
 * Display labels for anime airing status values.
 */
export const animeAiringStatusLabels = {
    finished_airing: 'Finished airing',
    currently_airing: 'Currently airing',
    not_yet_aired: 'Not yet aired',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeAiringStatus>;

/**
 * Display labels for anime age rating values.
 */
export const animeAgeRatingLabels = {
    g: 'G',
    pg: 'PG',
    pg_13: 'PG-13',
    r_17: 'R-17',
    r_plus: 'R+',
    rx: 'Rx',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeAgeRating>;

/**
 * Display labels for anime season values.
 */
export const animeSeasonLabels = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
} satisfies LabelMap<AnimeSeason>;

/**
 * Display labels for anime source values.
 */
export const animeSourceLabels = {
    manga: 'Manga',
    light_novel: 'Light Novel',
    visual_novel: 'Visual Novel',
    game: 'Game',
    original: 'Original',
    novel: 'Novel',
    web_manga: 'Web Manga',
    other: 'Other',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeSource>;

/**
 * Display labels for anime relation type values.
 */
export const animeRelationTypeLabels = {
    prequel: 'Prequel',
    sequel: 'Sequel',
    parent_story: 'Parent story',
    side_story: 'Side story',
    summary: 'Summary',
    alternative_version: 'Alternative version',
    alternative_setting: 'Alternative setting',
    spin_off: 'Spin-off',
    adaptation: 'Adaptation',
    character: 'Character',
    other: 'Other',
} satisfies LabelMap<AnimeRelationType>;

export { formatLabel };
