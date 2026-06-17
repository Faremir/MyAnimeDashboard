<script lang="ts">
    type Props = {
        page: number;
        totalPages: number;
        onPrevious: () => void;
        onNext: () => void;
    };

    let { page, totalPages, onPrevious, onNext }: Props = $props();
</script>

<div class="library-pagination">
    <button class="button" disabled={page <= 1} onclick={onPrevious} type="button">Previous</button>

    <span>Page {page} of {totalPages}</span>

    <button class="button" disabled={page >= totalPages} onclick={onNext} type="button">Next</button>
</div>

<style>
    .library-pagination {
        display: flex;
        align-items: center;
        gap: var(--space-3);
    }

    .library-pagination span {
        color: var(--color-text-muted);
        font-size: 13px;
    }
</style>
