<script lang="ts">
    import type { LibraryStateAction, LibraryStatus } from '../library.types';

    type Props = {
        status?: LibraryStatus;
        onAction: (action: LibraryStateAction) => void;
    };

    let { status, onAction }: Props = $props();

    const handleAction = (event: MouseEvent, action: LibraryStateAction) => {
        event.stopPropagation();
        onAction(action);
    };
</script>

<!-- TODO: Replace text glyphs with real icons. -->
{#if status === 'planned'}
    <button
        class="button watch-state-button"
        aria-label="Watch"
        type="button"
        onclick={(event) => handleAction(event, 'watch')}>
        👁
    </button>
    <button
        class="button watch-state-button"
        aria-label="Drop"
        type="button"
        onclick={(event) => handleAction(event, 'drop')}>
        ✕
    </button>
{:else if status === 'watching'}
    <button
        class="button watch-state-button"
        aria-label="Pause"
        type="button"
        onclick={(event) => handleAction(event, 'pause')}>
        ⏸
    </button>
    <button
        class="button watch-state-button"
        aria-label="Drop"
        type="button"
        onclick={(event) => handleAction(event, 'drop')}>
        ✕
    </button>
{:else if status === 'paused'}
    <button
        class="button watch-state-button"
        aria-label="Resume"
        type="button"
        onclick={(event) => handleAction(event, 'resume')}>
        ▶
    </button>
    <button
        class="button watch-state-button"
        aria-label="Drop"
        type="button"
        onclick={(event) => handleAction(event, 'drop')}>
        ✕
    </button>
{:else if status === 'dropped' || status === 'completed'}
    <button
        class="button watch-state-button"
        aria-label="Rewatch"
        type="button"
        onclick={(event) => handleAction(event, 'restart')}>
        ↻
    </button>
{:else if !status}
    <button
        class="button watch-state-button"
        aria-label="Watch"
        type="button"
        onclick={(event) => handleAction(event, 'watch')}>
        👁
    </button>
{/if}

<style>
    .watch-state-button {
        width: 100%;
        min-height: 34px;
    }
</style>
