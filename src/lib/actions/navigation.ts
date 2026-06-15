import { activeChildId, activeSectionId } from '@lib/stores/navigation';
import { closeAnimeDetail } from '@lib/actions/animeDetail';

import type { NavigationItem } from '@lib/types/navigation';

export const selectNavigationSection = (item: NavigationItem) => {
    closeAnimeDetail();

    activeSectionId.set(item.id);
    activeChildId.set(null);
};

export const selectNavigationItem = (item: NavigationItem) => {
    closeAnimeDetail();

    activeChildId.set(item.id);
};