import { useContext } from "react"
import { CalendarContext } from "../../components/CalendarLayout"
import { BaseCalendarListAPI } from "../../constants"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import { eventData } from "./interface"

export default () => {
    const calendar = useContext(CalendarContext)
    let { eventId } = useParams();
    let navigate = useNavigate()
    const [eventData, setEventData] = useState<eventData>({})

    const token = document.cookie.split("ssd-wad-calendar-token=")[1]

    const fetchEvent = async () => {
        const eventData = await fetch(`${BaseCalendarListAPI}/calendars/${calendar.calendarId}/events/${eventId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })

        const response = await eventData.json()
        if (response.error) {
            navigate("/");
            return
        }

        setEventData((state) => ({
            ...state,
            id: response.id,
            attendees: response.attendees || [response.creator],
            start: response.start,
            end: response.end,
            startTime: new Date(response?.start?.date || response?.start?.dateTime)?.toTimeString().slice(0, 5),
            summary: response.summary,
            organizer: response.organizer
        }))
    }

    const onChangeEventData = (e: any) => {
        if (e.target.name.includes("attendees")) {
            const index = e.target.name.split(".")[1];
            let attendees = eventData.attendees ? [...eventData.attendees] : [];
            attendees[index] = e.target.value
            setEventData((state) => ({ ...state, "attendees": attendees }))
        } else if (e.target.name === "start") {
            let year = new Date(eventData.start.dateTime).getFullYear()
            let month = new Date(eventData.start.dateTime).getMonth() + 1
            let day = new Date(eventData.start.dateTime).getDate();

            let start = {
                "dateTime": `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${e.target.value}:00+07:00`,
                "timeZone": "Asia/Jakarta"
            }
            let end = {
                "dateTime": `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}T${e.target.value}:59+07:00`,
                "timeZone": "Asia/Jakarta"
            }
            setEventData((state) => ({ ...state, start, end }))
        } else
            setEventData((state) => ({ ...state, [e.target.name]: e.target.value }))
    }

    const updateEvent = async () => {
        let body = JSON.parse(JSON.stringify(eventData))
        const updateAction = await fetch(`${BaseCalendarListAPI}/calendars/${calendar.calendarId}/events/${eventId}`, {
            method: "PATCH",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        const data = await updateAction.json()
    }

    const deleteEvent = async () => {
        const deleteAction = await fetch(`${BaseCalendarListAPI}/calendars/${calendar.calendarId}/events/${eventId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })

        if (deleteAction.ok) {
            navigate("/calendar")
        }
    }

    useEffect(() => {
        fetchEvent()
    }, [])

    return eventData?.id ? <div className="flex flex-col p-20">
        <div className="mb-10 flex justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate("/calendar")} type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </button>
                <div className="flex items-end gap-2">
                    <h2 className="text-4xl">Edit Event</h2> {eventData.organizer?.self ? <i className="text-slate-400">edit mode</i> : <i className="text-slate-400">read only mode</i>}
                </div>
            </div>
            <button onClick={deleteEvent} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex gap-2 items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                Delete
            </button>
        </div>

        <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                </div>
                <input onChange={onChangeEventData} name="summary" {...(!eventData.organizer?.self && { disabled: true })} defaultValue={eventData?.summary} type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
            </div>
        </div>
        <div className="mb-8">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date & Time</label>
            <div className="relative w-fit">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                </div>
                <input onChange={onChangeEventData} name="start" {...(!eventData.organizer?.self && { disabled: true })} defaultValue={eventData?.startTime} type="time" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
            </div>
        </div>

        <div className="mb-8 flex flex-col gap-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User</label>
            {eventData?.attendees?.map((attender: any, index: Number) => (
                <div className="relative w-80">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <input onChange={onChangeEventData} name={`attendees.${index}`} {...(!eventData.organizer?.self && { disabled: true })} defaultValue={attender.email} type="text" id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                </div>
            ))}
            {eventData.organizer?.self && <button type="button" className="text-gray-900 flex gap-4 w-fit my-4 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
                Add New User
            </button>}

            {eventData.organizer?.self &&
                <button onClick={updateEvent} type="button" className="gap-2 w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    Edit
                </button>
            }
        </div>

    </div> : <></>
}