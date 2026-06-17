export type SortDirection = 'asc' | 'desc';

export const normalizeSearchQuery = (value: string): string => {
    return value.trim().toLocaleLowerCase();
};

const collator = new Intl.Collator(undefined, {
    sensitivity: 'base',
    numeric: true,
});

export const compareStrings = (left: string, right: string, direction: SortDirection = 'asc'): number => {
    const result = collator.compare(left, right);

    return direction === 'asc' ? result : -result;
};

export const compareNumbers = (left: number, right: number, direction: SortDirection = 'asc'): number => {
    const result = left - right;

    return direction === 'asc' ? result : -result;
};

export const compareDates = (left: Date, right: Date, direction: SortDirection = 'asc'): number => {
    return compareNumbers(left.getTime(), right.getTime(), direction);
};
