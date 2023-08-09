export type CalendarContextType = {
    base: Date;
    current: number;
    currentMonth: number;
    currentYear: number;
    firstDay: number;
    lastDay: number;
    amountDay: number;
    lastDatePrevMonth: number;
    calendarEvent: any[];
    setEvent: (event: any) => void
};