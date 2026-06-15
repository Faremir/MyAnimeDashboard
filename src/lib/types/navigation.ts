export type NavigationIcon = | 'dashboard' | 'seasons' | 'calendar' | 'library' | 'settings';

export type NavigationItem = {
    id: string;
    label: string;
    href: `/${string}`;
    icon?: NavigationIcon;
    description?: string;
    children?: NavigationItem[];
};