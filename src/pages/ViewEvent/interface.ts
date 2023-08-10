export interface eventData {

    kind?: string,
    etag?: string,
    id?: string,
    status?: string,
    htmlLink?: string,
    created?: string,
    updated?: string,
    summary?: string,
    description?: string,
    creator?: any,
    organizer?: any,
    start?: any,
    startTime?: string
    end?: any,
    iCalUID?: string,
    sequence?: number,
    attendees?: any[] | [] | undefined,
    guestsCanInviteOthers?: Boolean,
    privateCopy?: Boolean,
    reminders?: any,
    eventType?: string

}