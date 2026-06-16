<script lang="ts">
    import type { LibraryStatus, WatchStateAction } from '@lib/types/library';

    type Props = {
        status?: LibraryStatus;
        onAction: (action: WatchStateAction) => void;
    };

    let { status, onAction }: Props = $props();

    const handleAction = (event: MouseEvent, action: WatchStateAction) => {
        event.stopPropagation();
        onAction(action);
    };
</script>

<!-- TODO: Replace text glyphs with real icons. -->
{#if status === 'planned'}
    <button aria-label="Watch" type="button" onclick={(event) => handleAction(event, 'watch')}>👁</button>
    <button aria-label="Drop" type="button" onclick={(event) => handleAction(event, 'drop')}>✕</button>
{:else if status === 'watching'}
    <button aria-label="Pause" type="button" onclick={(event) => handleAction(event, 'pause')}>⏸</button>
    <button aria-label="Drop" type="button" onclick={(event) => handleAction(event, 'drop')}>✕</button>
{:else if status === 'paused'}
    <button aria-label="Resume" type="button" onclick={(event) => handleAction(event, 'resume')}>▶</button>
    <button aria-label="Drop" type="button" onclick={(event) => handleAction(event, 'drop')}>✕</button>
{:else if status === 'dropped' || status === 'completed'}
    <button aria-label="Rewatch" type="button" onclick={(event) => handleAction(event, 'restart')}>↻</button>
{:else if !status}
    <button aria-label="Watch" type="button" onclick={(event) => handleAction(event, 'watch')}>👁</button>
{/if}

<style>
    button {
        padding: 6px 10px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        color: var(--color-text);
        background: var(--color-background);
        cursor: pointer;
        width: 100%;
        height: fit-content;
    }

    button:hover {
        border-color: var(--color-accent);
    }
</style>
