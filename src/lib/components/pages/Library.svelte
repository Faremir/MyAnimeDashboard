<script lang="ts">
    import AnimeDetail from '@lib/components/pages/AnimeDetail.svelte'
    import LibraryEntryCard from "@lib/components/blocks/LibraryEntryCard.svelte";

    import type {LibraryStatus} from '@lib/types/library';
    import type {NavigationItem} from '@lib/types/navigation';
    import {animeRepository} from '@lib/repositories/animeRepository';
    import {libraryRepository} from '@lib/repositories/libraryRepository';

    import {selectedAnimeId} from '@lib/state/anime';
    import {closeAnimeDetail, openAnimeDetail,} from '@lib/actions/animeDetail';

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
    let entries = $derived(selectedStatus ? libraryRepository.listByStatus(selectedStatus) : libraryRepository.list());
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

    .library-list {
        display: grid;
        gap: 12px;
    }


    .empty-state {
        color: var(--color-text-muted);
    }


</style>