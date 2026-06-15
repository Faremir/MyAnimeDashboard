import type {
    AnimeAgeRating,
    AnimeAiringStatus,
    AnimeMediaType,
    AnimeRelationType,
    AnimeSeason,
    AnimeSource,
} from '@lib/types/anime';

type LabelMap<T extends string> = Record<T, string>;

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

export const animeAiringStatusLabels = {
    finished_airing: 'Finished Airing',
    currently_airing: 'Currently Airing',
    not_yet_aired: 'Not Yet Aired',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeAiringStatus>;

export const animeAgeRatingLabels = {
    g: 'G - All Ages',
    pg: 'PG - Children',
    pg_13: 'PG-13 - Teens 13 or older',
    r_17: 'R - 17+',
    r_plus: 'R+ - Mild Nudity',
    rx: 'Rx - Hentai',
    unknown: 'Unknown',
} satisfies LabelMap<AnimeAgeRating>;

export const animeSeasonLabels = {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
} satisfies LabelMap<AnimeSeason>;

export const animeRelationTypeLabels = {
    prequel: 'Prequel',
    sequel: 'Sequel',
    parent_story: 'Parent Story',
    side_story: 'Side Story',
    summary: 'Summary',
    alternative_version: 'Alternative Version',
    alternative_setting: 'Alternative Setting',
    spin_off: 'Spin-off',
    adaptation: 'Adaptation',
    character: 'Character',
    other: 'Other',
} satisfies LabelMap<AnimeRelationType>;

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

export const formatLabel = <T extends string>(labels: LabelMap<T>, value: T): string => {
    return labels[value];
};
