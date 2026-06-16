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
            <h1>Dashboard</h1>
            <p class="muted">High-level overview of your anime activity will live here.</p>
        </div>
    </header>

    <div class="placeholder-grid">
        <article class="surface placeholder-card">
            <span>Watching</span>
            <strong>Coming soon</strong>
        </article>

        <article class="surface placeholder-card">
            <span>Next episode</span>
            <strong>Coming soon</strong>
        </article>

        <article class="surface placeholder-card">
            <span>Season activity</span>
            <strong>Coming soon</strong>
        </article>
    </div>
</section>

<style>
    .placeholder-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: var(--space-4);
    }

    .placeholder-card {
        display: grid;
        gap: var(--space-2);
        min-height: 130px;
        padding: var(--space-5);
    }

    .placeholder-card span {
        color: var(--color-text-muted);
        font-size: 13px;
        font-weight: 700;
    }

    .placeholder-card strong {
        font-size: 24px;
    }
</style>
