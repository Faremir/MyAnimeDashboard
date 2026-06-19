/**
 * Exhaustive display-label map for string union values.
 */
export type LabelMap<T extends string> = Record<T, string>;

/**
 * Resolves a display label from a typed label map.
 */
export const formatLabel = <T extends string>(labels: LabelMap<T>, value: T): string => {
    return labels[value];
};
