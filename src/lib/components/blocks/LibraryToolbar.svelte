<script lang="ts">
    import type { LibraryOrderBy, SortDirection } from '@lib/types/library';

    type Props = {
        search: string;
        orderBy: LibraryOrderBy;
        orderDirection: SortDirection;
        total: number;
    };

    let { search = $bindable(), orderBy = $bindable(), orderDirection = $bindable(), total }: Props = $props();
</script>

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

    <p class="result-count">{total} result{total === 1 ? '' : 's'}</p>
</div>

<style>
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
</style>
