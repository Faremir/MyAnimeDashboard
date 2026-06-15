import type { Anime, AnimeId } from './anime';

export type LibraryEntryId = number;

export type LibraryStatus = 'watching' | 'completed' | 'planned' | 'dropped' | 'paused';

export type AnimeLibraryEntry = {
  id: LibraryEntryId;
  animeId: AnimeId;

  status: LibraryStatus;
  progress: number;
  score?: number;
  notes?: string;

  addedAt: Date;
  updatedAt: Date;
};

export type AnimeLibraryListItem = AnimeLibraryEntry & {
  anime: Anime;
};
