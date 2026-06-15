<script lang="ts">
    import type {NavigationItem} from '@lib/types/navigation';

    type Props = {
        activeItem: NavigationItem;
    };

    let {activeItem}: Props = $props();
</script>

<h1>Dashboard</h1>
<p>Selected view: {activeItem.label}</p>