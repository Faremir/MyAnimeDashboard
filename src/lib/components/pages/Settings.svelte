<script lang="ts">
    import type { NavigationItem } from '@lib/types/navigation';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();
</script>

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Settings</h1>
            <p class="muted">Application preferences, MAL login, sync settings, and display options.</p>
        </div>
    </header>

    <div class="settings-list">
        <section class="surface settings-card">
            <h2>Account</h2>
            <p>MAL authentication will be configured here.</p>
        </section>

        <section class="surface settings-card">
            <h2>Schedule</h2>
            <p>Week start day, time display, and schedule filters will be configured here.</p>
        </section>

        <section class="surface settings-card">
            <h2>Appearance</h2>
            <p>Theme preferences will be configured here.</p>
        </section>
    </div>
</section>

<style>
    .settings-list {
        display: grid;
        gap: var(--space-4);
    }

    .settings-card {
        display: grid;
        gap: var(--space-2);
        padding: var(--space-5);
    }

    .settings-card h2,
    .settings-card p {
        margin: 0;
    }

    .settings-card p {
        color: var(--color-text-muted);
    }
</style>
