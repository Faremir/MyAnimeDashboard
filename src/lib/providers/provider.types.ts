/**
 * Metadata and schedule source used for anime facts and airing discovery.
 *
 * Phase 2 standardizes on AniList because it provides both anime metadata and
 * concrete airing schedule data.
 */
export type AnimeDataSourceId = 'anilist';

/**
 * External account systems that can own or synchronize user library state.
 */
export type UserLibrarySourceId = 'myanimelist' | 'anilist';

/**
 * External systems that can provide episode embed/watch availability.
 */
export type EpisodeEmbedSourceId = 'megaplay';

/**
 * Static display/config metadata for an external source.
 *
 * The source ID generic keeps each config constrained to the correct role while
 * avoiding separate descriptor types for every provider category.
 */
export type ProviderDescriptor<TSourceId extends string> = {
    id: TSourceId;
    label: string;
    description: string;
    requiresAuthentication: boolean;
};

/**
 * External systems that can identify records imported, synced, or matched by
 * MAD.
 */
export type ExternalIdentitySourceId = 'anilist' | 'myanimelist';

/**
 * Provider-side entity categories that can be matched to MAD-owned records.
 */
export type ExternalIdentityEntityKind = 'anime' | 'user' | 'schedule-airing';

/**
 * Provider-owned identifier used for import, sync, matching, and deduplication.
 *
 * ExternalIdentity is intentionally separate from module reference fields such
 * as malReferenceId or anilistReferenceId. Module reference fields support
 * product behavior like links and display, while ExternalIdentity supports
 * provider integration and should be consumed by import/sync orchestration.
 */
export type ExternalIdentity = {
    sourceId: ExternalIdentitySourceId;
    entityKind: ExternalIdentityEntityKind;
    value: string;
};

/**
 * Provider mapper result that pairs a provider-neutral value with the external
 * identities required to match that value to MAD-owned local records.
 */
export type ProviderMappedValue<TValue> = {
    value: TValue;
    externalIdentities: ExternalIdentity[];
};
