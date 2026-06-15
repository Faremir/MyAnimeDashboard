<script lang="ts">
    import AnimeDetail from '@lib/components/pages/AnimeDetail.svelte'
    import LibraryEntryCard from "@lib/components/blocks/LibraryEntryCard.svelte";

    import type {LibraryStatus} from '@lib/types/library';
    import type {NavigationItem} from '@lib/types/navigation';
    import {animeRepository} from '@lib/repositories/animeRepository';
    import {libraryRepository} from '@lib/repositories/libraryRepository';

    import {selectedAnimeId} from '@lib/state/anime';
    import {closeAnimeDetail, openAnimeDetail,} from '@lib/actions/animeDetail';

    import type {
        LibraryOrderBy,
        SortDirection,
    } from '@lib/repositories/libraryRepository';

    let search = $state('');
    let orderBy = $state<LibraryOrderBy>('dateUpdated');
    let orderDirection = $state<SortDirection>('desc');

    type Props = {
        activeItem: NavigationItem;
    };

    let {activeItem}: Props = $props();

    const statusByNavigationId: Record<string, LibraryStatus | null> = {
        library: null,
        'library-watching': 'watching',
        'library-completed': 'completed',
        'library-planned': 'planned',
        'library-dropped': 'dropped',
        'library-paused': 'paused',
    };

    let selectedStatus = $derived(statusByNavigationId[activeItem.id] ?? null);
    let libraryResult = $derived(
        libraryRepository.findMany({
            status: selectedStatus,
            search,
            orderBy,
            orderDirection,
            page: 1,
            pageSize: 20,
        }),
    );

    let entries = $derived(libraryResult.items);
    let selectedAnime = $derived($selectedAnimeId ? animeRepository.findById($selectedAnimeId) : undefined);
    let selectedAnimeRelations = $derived($selectedAnimeId ? animeRepository.getRelations($selectedAnimeId) : []);

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
                <input
                    type="search"
                    bind:value={search}
                    placeholder="Search anime..."
                />
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
                    <LibraryEntryCard
                        entry={entry}
                        onOpen={() => openAnimeDetail(entry.anime.id)}
                    />
                {/each}
            </div>
        {:else}
            <p class="empty-state">No anime found for this library view.</p>
        {/if}
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


</style>