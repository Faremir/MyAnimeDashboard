<script lang="ts">
    import type { NavigationItem } from '@lib/modules/navigation';
    import type { SortDirection } from '@lib/shared/utils/search';

    import { libraryRepository } from '../library.repository';
    import type { LibraryOrderBy, LibraryStatus } from '../library.types';
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

    let querySignature = $derived(
        JSON.stringify({
            selectedStatus,
            search,
            orderBy,
            orderDirection,
        }),
    );

    let previousQuerySignature = $state<string | null>(null);

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

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Library</h1>
            <p class="muted">Your library.</p>
        </div>
    </header>

    <LibraryToolbar bind:orderBy bind:orderDirection bind:search total={libraryResult.total} />

    {#if entries.length > 0}
        <div class="library-list">
            {#each entries as entry (entry.id)}
                <LibraryEntryCard {entry} />
            {/each}
        </div>
    {:else}
        <p class="empty-state">No anime found for this library view.</p>
    {/if}

    <LibraryPagination onNext={handleNextPage} onPrevious={handlePreviousPage} {page} {totalPages} />
</section>

<style>
    .library-list {
        display: grid;
        gap: var(--space-3);
    }
</style>
