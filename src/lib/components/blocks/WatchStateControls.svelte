<script lang="ts">
    import type { LibraryStatus, WatchStateAction } from '@lib/types/library';

    type Props = {
        status: LibraryStatus;
        onAction: (action: WatchStateAction) => void;
    };

    let { status, onAction }: Props = $props();

    const handleAction = (event: MouseEvent, action: WatchStateAction) => {
        event.stopPropagation();
        onAction(action);
    };
</script>

<div aria-label="Watch state actions" class="watch-state-controls">
    {#if status === 'planned'}
        <button type="button" onclick={(event) => handleAction(event, 'start-watching')}> Start watching </button>
    {:else if status === 'watching'}
        <button type="button" onclick={(event) => handleAction(event, 'pause')}>Pause</button>
        <button type="button" onclick={(event) => handleAction(event, 'drop')}>Drop</button>
    {:else if status === 'paused'}
        <button type="button" onclick={(event) => handleAction(event, 'resume')}>Resume</button>
        <button type="button" onclick={(event) => handleAction(event, 'drop')}>Drop</button>
    {:else if status === 'dropped'}
        <button type="button" onclick={(event) => handleAction(event, 'restart')}>Start from beginning</button>
    {:else if status === 'completed'}
        <span class="completed-label">Completed</span>
    {/if}
</div>

<style>
    .watch-state-controls {
        position: relative;
        z-index: 3;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        pointer-events: auto;
    }

    .watch-state-controls button {
        padding: 6px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-background);
        cursor: pointer;
        width: 100%;
    }

    .watch-state-controls button:hover {
        border-color: var(--color-accent);
    }

    .completed-label {
        color: var(--color-text-muted);
        font-size: 13px;
    }
</style>
