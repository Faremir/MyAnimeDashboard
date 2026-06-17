export type WeekStartDay = 'monday' | 'sunday';

export const daysInWeek = 7;

const millisecondsInDay = 24 * 60 * 60 * 1000;

export const startOfDay = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const addDays = (date: Date, days: number): Date => {
    return new Date(startOfDay(date).getTime() + days * millisecondsInDay);
};

export const addWeeks = (date: Date, weeks: number): Date => {
    return addDays(date, weeks * daysInWeek);
};

export const isSameDay = (left: Date, right: Date): boolean => {
    return startOfDay(left).getTime() === startOfDay(right).getTime();
};

export const isDateInRange = (date: Date, start: Date, end: Date): boolean => {
    const time = date.getTime();

    return time >= start.getTime() && time < end.getTime();
};

export const getDateString = (date: Date): string => {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, '0'),
        String(date.getDate()).padStart(2, '0'),
    ].join('-');
};

export const getWeekStart = (date: Date, weekStartsOn: WeekStartDay): Date => {
    const dayStart = startOfDay(date);
    const dayOfWeek = dayStart.getDay();

    const offset = weekStartsOn === 'monday' ? (dayOfWeek === 0 ? -6 : 1 - dayOfWeek) : -dayOfWeek;

    return addDays(dayStart, offset);
};
