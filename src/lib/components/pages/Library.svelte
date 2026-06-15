<script lang="ts">
    import { closeAnimeDetail, openAnimeDetail } from '@lib/actions/animeDetail';
    import LibraryEntryCard from '@lib/components/blocks/LibraryEntryCard.svelte';
    import AnimeDetail from '@lib/components/pages/AnimeDetail.svelte';
    import { animeRepository } from '@lib/repositories/animeRepository';
    import type { LibraryOrderBy, SortDirection } from '@lib/repositories/libraryRepository';
    import { libraryRepository } from '@lib/repositories/libraryRepository';
    import { selectedAnimeId } from '@lib/state/anime';
    import type { LibraryStatus } from '@lib/types/library';
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

        <div class="library-toolbar">
            <label>
                <span>Search</span>
                <input type="search" bind:value={search} placeholder="Search anime..." />
            </label>

            <label>
                <span>Sort by</span>
                <select bind:value={orderBy}>
                    <option value="dateUpdated">Date updated</option>
                    <option value="dateAdded">Date added</option>
                    <option value="title">Title</option>
                    <option value="releaseDate">Release date</option>
                </select>
            </label>

            <label>
                <span>Direction</span>
                <select bind:value={orderDirection}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>

            <p class="result-count">
                {libraryResult.total} result{libraryResult.total === 1 ? '' : 's'}
            </p>
        </div>

        {#if entries.length > 0}
            <div class="library-list">
                {#each entries as entry (entry.id)}
                    <LibraryEntryCard {entry} onOpen={() => openAnimeDetail(entry.anime.id)} />
                {/each}
            </div>
        {:else}
            <p class="empty-state">No anime found for this library view.</p>
        {/if}

        <div class="library-pagination">
            <button type="button" disabled={page <= 1} onclick={() => (page -= 1)}> Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button type="button" disabled={page >= totalPages} onclick={() => (page += 1)}> Next</button>
        </div>
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

    .library-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: end;
        gap: 12px;
    }

    .library-toolbar label {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .library-toolbar span,
    .result-count {
        color: var(--color-text-muted);
        font-size: 12px;
    }

    .library-toolbar input,
    .library-toolbar select {
        min-width: 180px;
        padding: 8px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-panel);
    }

    .result-count {
        margin: 0 0 9px;
    }

    .library-list {
        display: grid;
        gap: 12px;
    }

    .empty-state {
        color: var(--color-text-muted);
    }

    .library-pagination {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .library-pagination span {
        color: var(--color-text-muted);
        font-size: 13px;
    }

    .library-pagination button {
        padding: 8px 12px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-panel);
        cursor: pointer;
    }

    .library-pagination button:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
</style>
