import React, { useContext, useEffect } from "react"
import Base from "./Components/Base"
import Cell from "./Components/Cell"
import { BaseCalendarListAPI, GAPIbaseURL } from "../../constants"
import { CalendarContext } from "../../components/CalendarLayout"
import { useNavigate } from "react-router-dom"

export default () => {
    const token = document.cookie.split("ssd-wad-calendar-token=")[1]
    const calendar = useContext(CalendarContext)
    const navigate = useNavigate()

    console.log("---event",calendar.calendarEvent)

    const fetchEvent = async (primaryCalendar: any) => {
        let calendarEvent, data;

        calendarEvent = await fetch(`${BaseCalendarListAPI}/calendars/${primaryCalendar?.id}/events`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        data = await calendarEvent.json()
        calendar.setEvent(data?.items)
    }

    const fetchCalendar = async () => {

        const calendarList = await fetch(`${BaseCalendarListAPI}/users/me/calendarList`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        
        const response = await calendarList.json()
        if(response.error) {
            navigate("/");
            return
        }
        const primaryData = response?.items?.find((item: any) => item.accessRole === "owner")
        

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
    let BeginCalendar = [],
        EndCalendar = []

    for (let i = calendar.firstDay; i > 0; i--) {
        BeginCalendar.push(<Cell key={`prev-${i}`} disabled day={calendar.lastDatePrevMonth - i + 1}></Cell>)
    }

    for (let i = calendar.lastDay; i < 6; i++) {
        EndCalendar.push(<Cell key={`after-${i}`} disabled day={i - calendar.lastDay + 1}></Cell>)
    }

    return <CalendarContext.Provider value={calendar}>
        <main className="flex place-content-center">
            <Base>
                <div className="flex max-w-screen-xl">
                    {new Array(7).fill(null).map((_, index) => {
                        let dayName = new Date(new Date().getFullYear(), new Date().getMonth(), (index + 1) - calendar.firstDay).toLocaleDateString('en-US', { weekday: 'long' })
                        return <div key={dayName} className="w-60 h-8 justify-center flex">{dayName}</div>

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
        </main>
    </CalendarContext.Provider>
}