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
    <button type="button" disabled={page <= 1} onclick={onPrevious}>Previous</button>

    <span>Page {page} of {totalPages}</span>

    <button type="button" disabled={page >= totalPages} onclick={onNext}>Next</button>
</div>

<style>
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
