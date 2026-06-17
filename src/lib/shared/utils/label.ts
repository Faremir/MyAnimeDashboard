export type LabelMap<T extends string> = Record<T, string>;

export const formatLabel = <T extends string>(labels: LabelMap<T>, value: T): string => {
    return labels[value];
};
