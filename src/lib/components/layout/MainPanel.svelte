<script lang="ts">
  import type {NavigationItem} from '@lib/types/navigation';

  type Props = {
      activeNavItem: NavigationItem;
  };

  let {activeNavItem}: Props = $props();
</script>

<main class="main-panel">
    <h1>{activeNavItem.label}</h1>

    <div class="main-panel__content">
        <span>{activeNavItem.description}</span>
    </div>
</main>

<style>
  .main-panel {
      background: var(--color-panel);
  }
</style>