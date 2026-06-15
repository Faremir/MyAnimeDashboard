<script lang="ts">
    import { closeAnimeDetail, openAnimeDetail } from '@lib/actions/animeDetail';
    import LibraryEntryCard from '@lib/components/blocks/LibraryEntryCard.svelte';
    import LibraryPagination from '@lib/components/blocks/LibraryPagination.svelte';
    import LibraryToolbar from '@lib/components/blocks/LibraryToolbar.svelte';
    import AnimeDetail from '@lib/components/pages/AnimeDetail.svelte';
    import { animeRepository } from '@lib/repositories/animeRepository';
    import { libraryRepository } from '@lib/repositories/libraryRepository';
    import { selectedAnimeId } from '@lib/state/anime';
    import type { LibraryOrderBy, LibraryStatus, SortDirection, WatchStateAction } from '@lib/types/library';
    import type { NavigationItem } from '@lib/types/navigation';

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
    let selectedAnime = $derived($selectedAnimeId ? animeRepository.findById($selectedAnimeId) : undefined);
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
        onSelectAnime={openAnimeDetail}
    />
{:else}
    <section class="library-page">
        <header class="page-header">
            <h1>Library - {activeItem.label}</h1>
        </header>

        <LibraryToolbar bind:search bind:orderBy bind:orderDirection total={libraryResult.total} />

        {#if entries.length > 0}
            <div class="library-list">
                {#each entries as entry (entry.id)}
                    <LibraryEntryCard
                        {entry}
                        onOpen={() => openAnimeDetail(entry.anime.id)}
                        onWatchStateAction={(selectedEntry, action) => handleWatchStateAction(selectedEntry.id, action)}
                    />
                {/each}
            </div>
        {:else}
            <p class="empty-state">No anime found for this library view.</p>
        {/if}

        <LibraryPagination {page} {totalPages} onPrevious={handlePreviousPage} onNext={handleNextPage} />
    </section>
{/if}

<style>
    .library-page {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .page-header {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .page-header h1 {
        margin: 0;
    }

    .library-list {
        display: grid;
        gap: 12px;
    }

    .empty-state {
        color: var(--color-text-muted);
    }
</style>
