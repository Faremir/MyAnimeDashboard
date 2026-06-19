<script lang="ts">
    import type { NavigationItem } from '@lib/modules/navigation';
    import StatusList from '@lib/shared/ui/StatusList.svelte';

    import { settingsRepository } from '../settings.repository';

    type Props = {
        activeItem: NavigationItem;
    };

    let { activeItem }: Props = $props();

    const activeSettingsSection = $derived(
        activeItem.id
            ? settingsRepository.getSettingsSection(activeItem.id)
            : settingsRepository.getDefaultSettingsSection(),
    );
</script>

<section class="page">
    <header class="page-header">
        <div class="page-heading">
            <p class="eyebrow">Settings</p>
            <h1>{activeSettingsSection.title}</h1>
            <p class="muted">{activeSettingsSection.description}</p>
        </div>
    </header>

    <section class="surface settings-card">
        <StatusList ariaLabel={`${activeSettingsSection.title} status`} items={activeSettingsSection.items} />
    </section>
</section>

<style>
    .settings-card {
        display: grid;
        gap: var(--space-4);
        padding: var(--space-5);
    }
</style>
