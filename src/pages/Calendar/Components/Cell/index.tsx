import { useContext, useState } from "react"
import { CalendarContext } from "../../../../components/CalendarLayout"
import { useNavigate } from "react-router-dom";

export default ({ day, disabled, children }: any) => {
    const { current, currentYear, currentMonth } = useContext(CalendarContext);
    const navigate = useNavigate()

    const createEvent = () => {
        if (!disabled && (children?.length < 3 || children == undefined)) {
            navigate("/calendar/create")
            localStorage.setItem("create-day-event", `${currentYear}-${(currentMonth + 1) < 10 ? `0${currentMonth + 1}` : `${currentMonth + 1}`}-${day < 10 ? `0${day}` : day}`)
        }
    }
    return (
        <div onClick={() => createEvent()} className={`${disabled ? "bg-slate-500" : "cursor-pointer hover:bg-sky-300"} flex flex-col items-center w-[calc(100%/7)] h-60 border border-slate-300 p-2 overflow-hidden`}>
            <div className={`${current == day && "bg-blue-500 text-white"} text-bold rounded-full w-5 h-5 flex items-center justify-center`}>{day}</div>
            <div className="w-full">{children}</div>
        </div>
    )
}