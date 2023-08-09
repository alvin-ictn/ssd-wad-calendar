export interface eventDate {
    dateTime?: string
    date?: string
    timezone?: string
}

export interface eventTime {
    base: Date
    year: Number
    month: Number
    day: Number
    unix: Number
}