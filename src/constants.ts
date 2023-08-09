// Google URL
export const GAPIbaseURL = "https://www.googleapis.com"

export const calendarURL = `${GAPIbaseURL}/auth/calendar`

export const calendarReadOnlyURL = `${GAPIbaseURL}/auth/calendar.readonly`

export const calendarEventURL = `${GAPIbaseURL}/auth/calendar.events`

export const calendarEventReadOnlyURL = `${GAPIbaseURL}/auth/calendar.events.readonly`

// Google API Endpoint
export const BaseCalendarListAPI = `${GAPIbaseURL}/calendar/v3`

export const SpecificCalendarListAPI = (calendarId: string) => `${BaseCalendarListAPI}/${calendarId}`

export const WatchCalendarListAPI = `${BaseCalendarListAPI}/watch`

