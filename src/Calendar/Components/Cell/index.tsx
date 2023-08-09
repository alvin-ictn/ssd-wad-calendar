import { useContext, useState } from "react"
import { CalendarContext } from "../.."

export default ({ day, disabled }: any) => {
    const { current } = useContext(CalendarContext)
    return <div className={`${disabled && "bg-slate-500"} flex flex-col items-center w-[calc(100%/7)] h-60 border border-slate-300 p-2`}>
        <div className={`${current == day && "bg-blue-500 text-white"} text-bold rounded-full w-5 h-5 flex items-center justify-center`}>{day}</div>
        <div>event</div>
    </div>
}