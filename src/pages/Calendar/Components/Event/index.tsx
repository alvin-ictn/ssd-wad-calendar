import { useNavigate } from "react-router-dom";

export default ({ event }: any) => {
    const navigate = useNavigate()

    const stringToColour = (str: string) => {
        let hash = 0;
        str.split('').forEach(char => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        let colour = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            colour += value.toString(16).padStart(2, '0')
        }
        return colour
    }
    let bg = stringToColour(event.id);

    const accessEvent = (e: any, eventId: string) => {
        e.stopPropagation();
        navigate(`/calendar/${eventId}`)
    }
    return <div style={{ backgroundColor: bg }} className="w-full relative" onClick={(e) => accessEvent(e, event.id)}>
        {/* <div onClick={(e) => e.stopPropagation()} className="absolute z-10 right-0">
        🗑
        </div> */}
        <div className="text-slate-50 mix-blend-difference">{event.summary || "No Title"}</div>
        <div className="text-slate-50 mix-blend-difference">{event?.attendees?.map((attender: any) => attender.email).join(", ")}</div>
        <div className="text-slate-50 mix-blend-difference">{event?.timeEvent?.startEvent?.time}</div>
    </div>
}