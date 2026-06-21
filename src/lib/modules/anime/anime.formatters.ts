import { formatLabel, type LabelMap } from '@lib/shared/utils/label';

import type { AnimeAiringStatus, AnimeMediaType, AnimeRelationType, AnimeSeason } from './anime.types';

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
    finished: 'Finished airing',
    releasing: 'Currently airing',
    not_yet_released: 'Not yet aired',
    cancelled: 'Cancelled',
    paused: 'Paused',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeAiringStatus>;

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
