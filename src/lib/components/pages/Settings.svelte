<script lang="ts">
    import StatusList from '@lib/components/blocks/StatusList.svelte';
    import { settingsRepository } from '@lib/repositories/settingsRepository';
    import type { NavigationItem } from '@lib/types/navigation';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const settingsSections = settingsRepository.getSections();
</script>

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">{activeItem.label}</p>
            <h1>Settings</h1>
            <p class="muted">Account, provider, synchronization, schedule, appearance, and local-data setup.</p>
        </div>
    </header>

    <div class="settings-grid">
        {#each settingsSections as section (section.id)}
            <section class="surface settings-card">
                <header class="settings-card-header">
                    <div>
                        <p class="eyebrow">Settings</p>
                        <h2>{section.title}</h2>
                        <p class="muted">{section.description}</p>
                    </div>
                </header>

                <StatusList ariaLabel={`${section.title} status`} items={section.items} />
            </section>
        {/each}
    </div>
</section>

<style>
    .settings-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-4);
    }

    .settings-card {
        display: grid;
        gap: var(--space-4);
        padding: var(--space-5);
    }

    .settings-card-header {
        display: grid;
        gap: var(--space-1);
    }

    .settings-card-header h2,
    .settings-card-header p {
        margin: 0;
    }

    .settings-card-header h2 {
        font-size: 20px;
    }

    @media (max-width: 900px) {
        .settings-grid {
            grid-template-columns: 1fr;
        }
    }
</style>