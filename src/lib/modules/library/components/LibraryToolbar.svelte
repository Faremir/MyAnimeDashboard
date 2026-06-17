<script lang="ts">
    import type { SortDirection } from '@lib/shared/utils/search';

    import type { LibraryOrderBy } from '../library.types';

    type Props = {
        search: string;
        orderBy: LibraryOrderBy;
        orderDirection: SortDirection;
        total: number;
    };

    let { search = $bindable(), orderBy = $bindable(), orderDirection = $bindable(), total }: Props = $props();
</script>

<div class="toolbar">
    <label class="form-field" for="search">
        <span class="form-label">Search</span>
        <input bind:value={search} class="input" id="search" placeholder="Search anime..." type="search" />
    </label>

    <label class="form-field" for="orderBy">
        <span class="form-label">Sort by</span>
        <select bind:value={orderBy} class="select" id="orderBy">
            <option value="dateUpdated">Date updated</option>
            <option value="dateAdded">Date added</option>
            <option value="title">Title</option>
            <option value="releaseDate">Release date</option>
        </select>
    </label>

    <label class="form-field" for="orderDirection">
        <span class="form-label">Direction</span>
        <select bind:value={orderDirection} class="select" id="orderDirection">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </label>

    <p class="result-count">{total} result{total === 1 ? '' : 's'}</p>
</div>

<style>
    .result-count {
        margin: 0 0 9px;
        color: var(--color-text-muted);
        font-size: 12px;
    }
</style>
