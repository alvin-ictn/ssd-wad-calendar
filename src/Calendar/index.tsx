import React, { useEffect } from "react"
import Base from "./Components/Base"
import Cell from "./Components/Cell"
import { BaseCalendarListAPI, GAPIbaseURL } from "../constants"
// import Calendar = calendar_v3.Calendar;

export const CalendarContext = React.createContext({
    base: new Date(),
    current: new Date().getDate(),
    fullDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    calendarList: []
})

export default () => {
    const token = document.cookie.split("ssd-wad-calendar-token=")[1]

    const [calendar, setCalendar] = React.useState({
        base: new Date(),
        current: new Date().getDate(),
        fullDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
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

    useEffect(() => {
        fetchCalendar()
    }, [])

    return <CalendarContext.Provider value={calendar}>
        <Base>
            {new Array(calendar.fullDay).fill(null).map((_, i) => {
                return <Cell key={i + 1} day={i + 1}></Cell>
            })}
        </Base>
    </CalendarContext.Provider>
}