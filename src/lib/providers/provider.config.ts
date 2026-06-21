import type {
    AnimeDataSourceId,
    EpisodeEmbedSourceId,
    ProviderDescriptor,
    UserLibrarySourceId,
} from './provider.types';

/**
 * Static anime data source used for metadata and airing schedule discovery.
 */
export const animeDataSourceConfig = {
    id: 'anilist',
    label: 'AniList',
    description: 'Primary source for anime metadata and concrete airing schedule data.',
    requiresAuthentication: false,
} satisfies ProviderDescriptor<AnimeDataSourceId>;

/**
 * Static user library synchronization source options.
 */
export const userLibrarySourceConfig = [
    {
        id: 'myanimelist',
        label: 'MyAnimeList',
        description: 'Account-backed anime list source for MAL users.',
        requiresAuthentication: true,
    },
    {
        id: 'anilist',
        label: 'AniList',
        description: 'Account-backed anime list source for AniList users.',
        requiresAuthentication: true,
    },
] satisfies [ProviderDescriptor<UserLibrarySourceId>, ...ProviderDescriptor<UserLibrarySourceId>[]];

/**
 * Static episode embed source used for watch availability.
 */
export const episodeEmbedSourceConfig = {
    id: 'megaplay',
    label: 'Megaplay',
    description: 'Embed provider for episode watch availability by MAL or AniList ID.',
    requiresAuthentication: false,
} satisfies ProviderDescriptor<EpisodeEmbedSourceId>;
