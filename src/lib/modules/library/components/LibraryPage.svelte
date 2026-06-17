<script lang="ts">
    import {
        AnimeDetail,
        animeRepository,
        closeAnimeDetail,
        openAnimeDetail,
        selectedAnimeId,
    } from '@lib/modules/anime';
    import type { NavigationItem } from '@lib/modules/navigation';
    import type { SortDirection } from '@lib/shared/utils/search';

    import { libraryRepository } from '../library.repository';
    import type { LibraryOrderBy, LibraryStatus, WatchStateAction } from '../library.types';
    import LibraryEntryCard from './LibraryEntryCard.svelte';
    import LibraryPagination from './LibraryPagination.svelte';
    import LibraryToolbar from './LibraryToolbar.svelte';

    let search = $state('');
    let orderBy = $state<LibraryOrderBy>('dateUpdated');
    let orderDirection = $state<SortDirection>('desc');

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const statusByNavigationId: Record<string, LibraryStatus | null> = {
        library: null,
        'library-watching': 'watching',
        'library-completed': 'completed',
        'library-planned': 'planned',
        'library-dropped': 'dropped',
        'library-paused': 'paused',
    };
    let page = $state(1);
    const pageSize = 20;

    let selectedStatus = $derived(statusByNavigationId[activeItem.id] ?? null);
    let libraryResult = $derived(
        libraryRepository.findMany({
            status: selectedStatus,
            search,
            orderBy,
            orderDirection,
            page,
            pageSize,
        }),
    );
    let entries = $derived(libraryResult.items);
    let totalPages = $derived(Math.max(1, Math.ceil(libraryResult.total / libraryResult.pageSize)));
    let selectedAnime = $derived($selectedAnimeId ? animeRepository.findAnime($selectedAnimeId) : undefined);
    let selectedAnimeRelations = $derived($selectedAnimeId ? animeRepository.getRelations($selectedAnimeId) : []);

    let querySignature = $derived(
        JSON.stringify({
            selectedStatus,
            search,
            orderBy,
            orderDirection,
        }),
    );

    let previousQuerySignature = $state<string | null>(null);

    const handleWatchStateAction = (entryId: number, action: WatchStateAction) => {
        console.info('Watch state action selected:', {
            entryId,
            action,
        });
    };

    const handlePreviousPage = () => {
        page -= 1;
    };

    const handleNextPage = () => {
        page += 1;
    };

    $effect(() => {
        if (previousQuerySignature === null) {
            previousQuerySignature = querySignature;
            return;
        }

        if (querySignature === previousQuerySignature) {
            return;
        }

        previousQuerySignature = querySignature;
        page = 1;
    });
</script>

{#if selectedAnime}
    <AnimeDetail
        anime={selectedAnime}
        relations={selectedAnimeRelations}
        onBack={closeAnimeDetail}
        onSelectAnime={openAnimeDetail} />
{:else}
    <section class="page">
        <header class="page-header">
            <div class="page-heading">
                <p class="eyebrow">{activeItem.label}</p>
                <h1>Library</h1>
                <p class="muted">Your library.</p>
            </div>
        </header>

        <LibraryToolbar bind:search bind:orderBy bind:orderDirection total={libraryResult.total} />

        {#if entries.length > 0}
            <div class="library-list">
                {#each entries as entry (entry.id)}
                    <LibraryEntryCard
                        {entry}
                        onOpen={() => openAnimeDetail(entry.anime.id)}
                        onWatchStateAction={(selectedEntry, action) =>
                            handleWatchStateAction(selectedEntry.id, action)} />
                {/each}
            </div>
        {:else}
            <p class="empty-state">No anime found for this library view.</p>
        {/if}

        <LibraryPagination {page} {totalPages} onPrevious={handlePreviousPage} onNext={handleNextPage} />
    </section>
{/if}

<style>
    .library-list {
        display: grid;
        gap: var(--space-3);
    }
</style>
