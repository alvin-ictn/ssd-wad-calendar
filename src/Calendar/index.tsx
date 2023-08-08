import React from "react"
import Base from "./Components/Base"
import Cell from "./Components/Cell"

export const CalendarContext = React.createContext({
    base: new Date(),
    current: new Date().getDate(),
    fullDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
})

export default () => {
    const [date, setDate] = React.useState({
        base: new Date(),
        current: new Date().getDate(),
        fullDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    })

    return <CalendarContext.Provider value={date}>
        <Base>
            {new Array(date.fullDay).fill(null).map((_, i) => {
                return <Cell key={i + 1} day={i + 1}></Cell>
            })}
        </Base>
    </CalendarContext.Provider>
}