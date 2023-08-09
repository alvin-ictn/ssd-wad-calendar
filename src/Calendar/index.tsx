import React, { useEffect } from "react"
import Base from "./Components/Base"
import Cell from "./Components/Cell"
import { BaseCalendarListAPI, GAPIbaseURL } from "../constants"
// import Calendar = calendar_v3.Calendar;

export const CalendarContext = React.createContext({
    base: new Date(), // base date
    current: new Date().getDate(), // today
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    firstDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(), // (this year, this month, 1) to get first day on themonth (eg: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc..)
    lastDay: new Date(new Date().getFullYear(), new Date().getMonth(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).getDay(),
    amountDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(), // total day in the month
    lastDatePrevMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
    calendarList: []
})

export default () => {
    const token = document.cookie.split("ssd-wad-calendar-token=")[1]

    const [calendar, setCalendar] = React.useState({
        base: new Date(),
        current: new Date().getDate(),
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        firstDay: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay(),
        lastDay: new Date(new Date().getFullYear(), new Date().getMonth(), new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()).getDay(),
        amountDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
        lastDatePrevMonth: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
        calendarList: []
    })

    const fetchEvent = async (primaryCalendar: any) => {
        console.log("PRIM", primaryCalendar)
        const calendarEvent = await fetch(`${BaseCalendarListAPI}/calendars/${primaryCalendar.id}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        const data = await calendarEvent.json()
        console.log("EVENT DATA", data)
    }

    const fetchCalendar = async () => {

        const calendarList = await fetch(`${BaseCalendarListAPI}/users/me/calendarList`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        const data = await calendarList.json()
        const primaryData = data.items.find((item: any) => item.accessRole === "owner")


        const eventData = await fetchEvent(primaryData)
        // https://www.googleapis.com/calendar/v3/calendars/calendarId/events
        // if (data) {
        //     setCalendar((state) => ({ ...state, calendarList: data.items }))
        // }
        // let fullEvent = await data?.items?.map(async (calendarItem: any) => {
        //     https://www.googleapis.com/calendar/v3/calendars/calendarId/events
        //     await fetch(`${BaseCalendarListAPI}/`)
        // })
        // setToken(codeResponse.access_token);
    }

    // useEffect(() => {
    //     fetchCalendar()
    // }, [])
    let BeginCalendar = [],
        EndCalendar = []

    for (let i = calendar.firstDay; i > 0; i--) {
        BeginCalendar.push(<Cell disabled day={calendar.lastDatePrevMonth - i + 1}></Cell>)
    }

    for (let i = calendar.lastDay; i < 6; i++) {
        EndCalendar.push(<Cell disabled day={i - calendar.lastDay + 1}></Cell>)
    }

    return <CalendarContext.Provider value={calendar}>
        <Base>
            <div className="flex max-w-screen-xl">
                {new Array(7).fill(null).map((_, index) => {
                    let dayName = new Date(new Date().getFullYear(), new Date().getMonth(), (index + 1) - calendar.firstDay).toLocaleDateString('en-US', { weekday: 'long' })
                    return <div className="w-60 h-8 justify-center flex">{dayName}</div>

                })}
            </div>
            <div className="flex max-w-screen-xl flex-wrap">
                {BeginCalendar}
                {new Array(calendar.amountDay).fill(null).map((_, i) => {
                    return <Cell key={i + 1} day={i + 1}></Cell>
                })}
                {EndCalendar}
            </div>
        </Base>
    </CalendarContext.Provider>
}