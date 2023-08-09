export default ({ event }: any) => {

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

    return <div style={{ backgroundColor: bg }} className="w-full">
        <div className="text-slate-50 mix-blend-difference">{event.summary || "No Title"}</div>
        <div className="text-slate-50 mix-blend-difference">{event?.attendees?.map((attender: any) => attender.email).join(", ")}</div>
        <div>{event?.timeEvent?.startEvent?.time}</div>
    </div>
}