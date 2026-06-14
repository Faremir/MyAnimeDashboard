<script lang="ts">
  import type { NavigationItem } from '@lib/types/navigation';

  type Props = {
      primaryItems: NavigationItem[];
      secondaryItems: NavigationItem[];
      activeSection: NavigationItem;
      activeItem: NavigationItem;
      onSelectSection: (item: NavigationItem) => void;
      onSelectItem: (item: NavigationItem) => void;
  };

  let {
      primaryItems,
      secondaryItems,
      activeSection,
      activeItem,
      onSelectSection,
      onSelectItem,
  }: Props = $props();
</script>

<div class="navigation-shell">
  <nav class="primary-navigation" aria-label="Primary navigation">
    {#each primaryItems as item}
      <button
              type="button"
              aria-current={item.id === activeSection.id ? 'page' : undefined}
              onclick={() => onSelectSection(item)}
      >
        {item.label}
      </button>
    {/each}
  </nav>

  <nav class="secondary-navigation" aria-label="Secondary navigation">
    {#each secondaryItems as item}
      <button
              type="button"
              aria-current={item.id === activeItem.id ? 'page' : undefined}
              onclick={() => onSelectItem(item)}
      >
        {item.label}
      </button>
    {/each}
  </nav>
</div>

<style>
  .navigation-shell {
      display: grid;
      grid-template-columns: 72px 240px;
      min-height: 100vh;
  }

  .primary-navigation,
  .secondary-navigation {
      display: flex;
      flex-direction: column;
  }

  .primary-navigation {
      background: var(--color-panel);
      border-right: 1px solid var(--color-border);
  }

  .secondary-navigation {
      background: var(--color-panel-alt);
      border-right: 1px solid var(--color-border);
  }
</style>