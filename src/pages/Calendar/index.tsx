import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CalendarContext } from "../../components/CalendarLayout"
import { BaseCalendarListAPI } from "../../constants"
import Base from "./Components/Base"
import Cell from "./Components/Cell"
import Event from "./Components/Event"
import { eventDate, eventTime } from "./interface/calendar"

export default () => {
    const token = document.cookie.split("ssd-wad-calendar-token=")[1]
    const calendar = useContext(CalendarContext)
    const navigate = useNavigate()

    const createDateFromEvent = (date: eventDate): eventTime | undefined => {
        if (date === undefined) return undefined
        if (date.hasOwnProperty("dateTime")) {
            let baseDate = date.dateTime ? new Date(date.dateTime) : new Date("1920-12-17T03:24:00")
            return {
                base: baseDate,
                year: baseDate.getFullYear(),
                month: baseDate.getMonth(),
                day: baseDate.getDate(),
                unix: baseDate.getTime(),
                time: baseDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
        } else if (date.hasOwnProperty("date")) {
            let baseDate = date.date ? new Date(date.date) : new Date("1920-12-17T03:24:00")
            return {
                base: baseDate,
                year: baseDate.getFullYear(),
                month: baseDate.getMonth(),
                day: baseDate.getDate(),
                unix: baseDate.getTime(),
                time: baseDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            }
        }
    }

    const indexingEvent = (base: any, index: any, event: any) => {
        if (base[index] == undefined) {
            let arrayEvent = []
            arrayEvent?.push(event)
            Object.assign(base, { [index]: arrayEvent })
        }
        else
            base[index] = [...base[index], event]

        return base
    }

    const filterEvent = (events: any) => {
        let orderedEvent = events.reduce((prev: any, event: any, index: any) => {
            const startEvent = createDateFromEvent(event.start)
            const endEvent = createDateFromEvent(event.end)

            let eventDay = startEvent?.day.toString() || "other"
            if (startEvent) {
                if (endEvent?.day !== undefined)
                    if (startEvent.day === endEvent.day)
                        prev = indexingEvent(prev, eventDay, { ...event, timeEvent: { startEvent, endEvent } })
                    else
                        for (let i: any = startEvent.day; i < endEvent?.day; i++) {
                            prev = indexingEvent(prev, i.toString(), { ...event, timeEvent: { startEvent, endEvent } })
                        }
                else {
                    prev = indexingEvent(prev, eventDay, { ...event, timeEvent: { startEvent, endEvent } })
                }

            }

            return prev
        }, {})

        return orderedEvent
    }

    const fetchEvent = async (primaryCalendar: any) => {
        let calendarEvent, data;
        let timeMin = `${calendar.currentYear}-${(calendar.currentMonth + 1) < 10 ? `0${calendar.currentMonth + 1}` : calendar.currentMonth + 1}-01T00:00:00.000Z`
        let timeMax = `${calendar.currentYear}-${(calendar.currentMonth + 1) < 10 ? `0${calendar.currentMonth + 1}` : calendar.currentMonth + 1}-${calendar.amountDay}T00:00:00.000Z`
        let params = `timeMin=${timeMin}&timeMax=${timeMax}`

        calendarEvent = await fetch(`${BaseCalendarListAPI}/calendars/${primaryCalendar?.id}/events?${params}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        data = await calendarEvent.json()

        return filterEvent(data?.items)
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
        if (response.error) {
            navigate("/");
            return
        }
        const primaryData = response?.items?.find((item: any) => item.accessRole === "owner")

        if (primaryData) {
            calendar.setCalendarId(primaryData.id)
            localStorage.setItem("primaryId", primaryData.id)
        }

        const eventData = await fetchEvent(primaryData)

        if (eventData) {
            calendar.setEvent(eventData)
        }
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
                        let eventOnDay = calendar.calendarEvent[i + 1]?.reverse();

                        return <Cell key={i + 1} day={i + 1}>
                            {eventOnDay?.map((eventItem: any) =>
                                <Event key={eventItem.id} event={eventItem}></Event>)}
                        </Cell>
                    })}
                    {EndCalendar}
                </div>
            </Base>
        </main>
    </CalendarContext.Provider>
}