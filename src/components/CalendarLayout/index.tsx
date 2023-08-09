import React from "react"
import { useOutlet } from "react-router-dom"
import { CalendarContextType } from "./interface"

export const CalendarContext = React.createContext<CalendarContextType>({
    base: new Date(), // base date
    current: new Date().getDate(), // today
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    firstDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(), // (this year, this month, 1) to get first day on themonth (eg: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc..)
    lastDay: new Date(new Date().getFullYear(), new Date().getMonth(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).getDay(),
    amountDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), // total day in the month
    lastDatePrevMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
    calendarEvent: [],
    setEvent: () => { }
})


export default () => {
    const [calendar, setCalendar] = React.useState({
        base: new Date(),
        current: new Date().getDate(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        firstDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(),
        lastDay: new Date(new Date().getFullYear(), new Date().getMonth(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).getDay(),
        amountDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
        lastDatePrevMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
        calendarEvent: []
    })

    const setEvent = (events: any) => setCalendar((state) => ({ ...state, calendarEvent: events }))


    const outlet = useOutlet()

    return <CalendarContext.Provider value={{ ...calendar, setEvent }}>{outlet}</CalendarContext.Provider>
}