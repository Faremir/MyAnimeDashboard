export { closeAnimeDetail, openAnimeDetail } from './anime.actions';
export { animeRepository } from './anime.repository';
export { selectedAnimeId } from './anime.state';
export type {
    Anime,
    AnimeAgeRating,
    AnimeAiringStatus,
    AnimeId,
    AnimeMediaType,
    AnimeRelationType,
    AnimeSeason,
    AnimeSource,
    ExternalAnimeIds,
    RelatedAnimeReference,
    RelatedAnimeView,
} from './anime.types';
export { default as AnimeDetail } from './components/AnimeDetail.svelte';
