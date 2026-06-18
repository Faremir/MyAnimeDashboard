<script lang="ts">
    import {
        AnimeDetail,
        animeRepository,
        closeAnimeDetail,
        openAnimeDetail,
        selectedAnimeId,
    } from '@lib/modules/anime';
    import { DashboardPage } from '@lib/modules/dashboard';
    import { LibraryPage } from '@lib/modules/library';
    import type { NavigationItem, NavigationSection } from '@lib/modules/navigation';
    import { SchedulePage } from '@lib/modules/schedule';
    import { SettingsPage } from '@lib/modules/settings';

    type Props = {
        activeSection: NavigationSection;
        activeItem: NavigationItem;
    };

    let { activeSection, activeItem }: Props = $props();

    let selectedAnime = $derived($selectedAnimeId ? animeRepository.findAnime($selectedAnimeId) : undefined);

    let selectedAnimeRelations = $derived($selectedAnimeId ? animeRepository.getRelations($selectedAnimeId) : []);
</script>

<main class="main-panel">
    <div class="main-panel-inner">
        {#if selectedAnime}
            <AnimeDetail
                anime={selectedAnime}
                relations={selectedAnimeRelations}
                onBack={closeAnimeDetail}
                onSelectAnime={openAnimeDetail} />
        {:else if activeSection.id === 'dashboard'}
            <DashboardPage {activeItem} />
        {:else if activeSection.id === 'schedule'}
            <SchedulePage {activeItem} />
        {:else if activeSection.id === 'library'}
            <LibraryPage {activeItem} />
        {:else if activeSection.id === 'settings'}
            <SettingsPage {activeItem} />
        {:else}
            <section class="page">
                <header class="page-header">
                    <div class="page-heading">
                        <p class="eyebrow">{activeSection.label}</p>
                        <h1>{activeItem.label}</h1>
                    </div>
                </header>
            </section>
        {/if}
    </div>
</main>

<style>
    .main-panel {
        min-width: 0;
        min-height: 100vh;
        overflow-x: hidden;
        background: transparent;
    }

    .main-panel-inner {
        width: min(100%, var(--layout-main-max-width));
        margin: 0 auto;
        padding: var(--space-6);
    }

    @media (max-width: 760px) {
        .main-panel {
            min-height: auto;
        }

        .main-panel-inner {
            padding: var(--space-4);
        }
    }
</style>
