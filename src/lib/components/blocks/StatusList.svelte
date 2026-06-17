<script lang="ts">
    import type { StatusItem } from '@lib/types/status';

    type Props = {
        items: StatusItem[];
        ariaLabel?: string;
    };

    let { items, ariaLabel }: Props = $props();
</script>

<div aria-label={ariaLabel} class="status-list">
    {#each items as item (item.label)}
        <div class={`status-row tone-${item.tone}`}>
            <div class="status-row-content">
                <span>{item.label}</span>

                {#if item.description}
                    <p>{item.description}</p>
                {/if}
            </div>

            <strong>{item.value}</strong>
        </div>
    {/each}
</div>

<style>
    .status-list {
        display: grid;
        gap: var(--space-3);
    }

    .status-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-3);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-border-strong);
        border-radius: var(--radius-md);
        background: rgb(20 22 29 / 38%);
    }

    .status-row-content {
        display: grid;
        min-width: 0;
        gap: var(--space-1);
    }

    .status-row span {
        color: var(--color-text-muted);
        font-size: 13px;
        font-weight: 700;
    }

    .status-row p {
        margin: 0;
        color: var(--color-text-subtle);
        font-size: 12px;
        line-height: 1.4;
    }

    .status-row strong {
        flex-shrink: 0;
        color: var(--color-text);
        font-size: 16px;
        text-align: right;
    }

    .tone-good {
        border-left-color: var(--color-success);
    }

    .tone-warning {
        border-left-color: var(--color-warning);
    }

    .tone-neutral {
        border-left-color: var(--color-border-strong);
    }

    @media (max-width: 640px) {
        .status-row {
            align-items: flex-start;
            flex-direction: column;
        }

        .status-row strong {
            text-align: left;
        }
    }
</style>