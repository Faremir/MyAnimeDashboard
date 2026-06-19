export type WeekStartDay = 'monday' | 'sunday';

const millisecondsInDay = 24 * 60 * 60 * 1000;

/**
 * Creates a new Date set to the start of the given calendar day.
 *
 * The returned date uses the local timezone and has its time reset to
 * 00:00:00.000. The original Date instance is not modified.
 *
 * @param date - The date whose calendar day should be normalized.
 * @returns A new Date representing midnight at the start of the given day.
 */
export const startOfDay = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

/**
 * Adds a number of days to the given date.
 *
 * The input date is first normalized to the start of its calendar day before
 * the day offset is applied. Positive values move forward in time, while
 * negative values move backward.
 *
 * @param date - The date to use as the starting point.
 * @param days - The number of days to add. Use a negative value to subtract days.
 * @returns A new Date offset by the given number of days.
 */
export const addDays = (date: Date, days: number): Date => {
    return new Date(startOfDay(date).getTime() + days * millisecondsInDay);
};

/**
 * Adds a number of weeks to the given date.
 *
 * The input date is normalized to the start of its calendar day before the
 * week offset is applied. Positive values move forward in time, while negative
 * values move backward.
 *
 * @param date - The date to use as the starting point.
 * @param weeks - The number of weeks to add. Use a negative value to subtract weeks.
 * @returns A new Date offset by the given number of weeks.
 */
export const addWeeks = (date: Date, weeks: number): Date => {
    return addDays(date, weeks * 7);
};

/**
 * Checks whether two dates are on the same local calendar day.
 *
 * Time values are ignored. Only the local year, month, and day are compared.
 *
 * @param left - The first date to compare.
 * @param right - The second date to compare.
 * @returns True if both dates fall on the same local calendar day; otherwise false.
 */
export const isSameDay = (left: Date, right: Date): boolean => {
    return startOfDay(left).getTime() === startOfDay(right).getTime();
};

/**
 * Checks whether a date falls within a half-open date range.
 *
 * The start boundary is inclusive and the end boundary is exclusive:
 * `date >= start && date < end`.
 *
 * @param date - The date to test.
 * @param start - The inclusive start of the range.
 * @param end - The exclusive end of the range.
 * @returns True if the date is inside the range; otherwise false.
 */
export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    const time = date.getTime();

    return time >= start.getTime() && time < end.getTime();
};

/**
 * Formats a date as a local calendar date string.
 *
 * The returned value uses the `YYYY-MM-DD` format.
 *
 * @param date - The date to format.
 * @returns The formatted local date string.
 */
export const getDateString = (date: Date): string => {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
};

/**
 * Gets the first day of the week containing the given date.
 *
 * The returned date is normalized to the start of the day in the local timezone.
 * The week can start either on Monday or Sunday, depending on the provided
 * `weekStartsOn` value.
 *
 * @param date - The date whose week should be resolved.
 * @param weekStartsOn - The day that should be treated as the first day of the week.
 * @returns A new Date representing the start of the week containing the given date.
 */
export const getWeekStart = (date: Date, weekStartsOn: WeekStartDay): Date => {
    const dayStart = startOfDay(date);
    const dayOfWeek = dayStart.getDay();

    const offset = weekStartsOn === 'monday' ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) : -dayOfWeek;

    return addDays(dayStart, offset);
};
