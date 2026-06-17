import { closeAnimeDetail } from '@lib/modules/anime';

import { activeChildId, activeSectionId } from './navigation.state';
import type { NavigationItem, NavigationSection } from './navigation.types';

export const selectNavigationSection = (item: NavigationSection) => {
    closeAnimeDetail();

    activeSectionId.set(item.id);
    activeChildId.set(null);
};

export const selectNavigationItem = (item: NavigationItem) => {
    closeAnimeDetail();

    activeChildId.set(item.id);
};
