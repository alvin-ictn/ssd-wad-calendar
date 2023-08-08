import React from "react"
import Base from "./Components/Base"
import Cell from "./Components/Cell"
// import Calendar = calendar_v3.Calendar;

export const CalendarContext = React.createContext({
    base: new Date(),
    current: new Date().getDate(),
    fullDay: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
})

export default () => {
    const scopes = [
        'https://www.googleapis.com/auth/calendar.events', // required for reading all details and writing into calendar
        'https://www.googleapis.com/auth/calendar.readonly',
    ];
    const calendarID = process.env.REACT_APP_CALENDAR_ID;
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;
    // const oauth2Client = new auth.OAuth2(
    //     calendarID,
    //     "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",
    //     "http://localhost:3000/calendar"
    // );

    // const url = oauth2Client.generateAuthUrl({
    //     // 'online' (default) or 'offline' (gets refresh_token)
    //     access_type: 'offline',

    //     // If you only need one scope you can pass it as a string
    //     scope: scopes
    //   });
    // console.log("TEST",url)

    // let calendarApi: Calendar;
    // const calendarAuth = new AuthPlus({
    //     authClient: undefined,
    //     // Scopes can be specified either as an array or as a single, space-delimited string.
    //     scopes: ['https://www.googleapis.com/auth/calendar']

    // })

    // console.log("test", calendarAuth)
    // {
    //     "credential": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkxMWUzOWUyNzkyOGFlOWYxZTlkMWUyMTY0NmRlOTJkMTkzNTFiNDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDUzMzQzMTc2MzQtbHE2ajQ5NXZyNnVybDd1dHIwdGUza3VwajJxcmFkMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDUzMzQzMTc2MzQtbHE2ajQ5NXZyNnVybDd1dHIwdGUza3VwajJxcmFkMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY3NDU4NjA1NjMwNDI5MDEwMTMiLCJlbWFpbCI6ImFsdmluLmljdG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTY5MTUxNjMzMywibmFtZSI6IkFsdmluIE1hbnRvdmFuaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjeTVEaFhQTklmS1g2ZGFWMUxMaUtoU1VrNE9xOGJIZWRZZzdOSVRNTHk9czk2LWMiLCJnaXZlbl9uYW1lIjoiQWx2aW4iLCJmYW1pbHlfbmFtZSI6Ik1hbnRvdmFuaSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjkxNTE2NjMzLCJleHAiOjE2OTE1MjAyMzMsImp0aSI6IjgwYmFjNTE3YjEzODNiYjM5YThiY2FhNjM0NTEwOWRkNjJjYzdhZmQifQ.k6agx4b8iCS_Qf7ls95zGPwHkPx15pC4qYuavTCuB0_Vr3qTziyuNgcr3EVlN4Z8S9XE1ZXHvqHJfc1gjPxY3ZKr2yhkAZSBmpHWai26TQU9dyEcfm73_gIyaJqdPcggwU38yVRajLFfMh0Dc3cyyUm4Im3DaWhz4VMF_IlWOp9kgZAh6jry2FpDub92qyavqkcDM6J1nYkzJOJfj_96jyvuGn6XUiU-xOHa4VapL8es_Qs9_K1Fv2-GQ-VjzikRJGsdo_35--1NRAiPkL1LiJEDgWrXhIq2IzlV4TyUAY0_w0tsRl_XPTeATkRP_7KamlbUQwFgXR-oV1Q3y8dzLQ",
    //     "clientId": "yarn345334317634-lq6j495vr6url7utr0te3kupj2qrad21.apps.googleusercontent.com",
    //     "select_by": "btn"
    // }

    // const getUsersCalendarList = async (accessToken: any) => {
    //     let calendarsList = await fetch('https://www.googleapis.com/calenda/v3/users/me/calendarList', {
    //         headers: { Authorization: `Bearer ${accessToken}` },
    //     });
    //     return calendarsList.json();
    // }


    // clientId
    // : 
    // "345334317634-lq6j495vr6url7utr0te3kupj2qrad21.apps.googleusercontent.com"
    // credential
    // : 
    // "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkxMWUzOWUyNzkyOGFlOWYxZTlkMWUyMTY0NmRlOTJkMTkzNTFiNDQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDUzMzQzMTc2MzQtbHE2ajQ5NXZyNnVybDd1dHIwdGUza3VwajJxcmFkMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDUzMzQzMTc2MzQtbHE2ajQ5NXZyNnVybDd1dHIwdGUza3VwajJxcmFkMjEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY3NDU4NjA1NjMwNDI5MDEwMTMiLCJlbWFpbCI6ImFsdmluLmljdG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTY5MTUxNzAwNSwibmFtZSI6IkFsdmluIE1hbnRvdmFuaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjeTVEaFhQTklmS1g2ZGFWMUxMaUtoU1VrNE9xOGJIZWRZZzdOSVRNTHk9czk2LWMiLCJnaXZlbl9uYW1lIjoiQWx2aW4iLCJmYW1pbHlfbmFtZSI6Ik1hbnRvdmFuaSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjkxNTE3MzA1LCJleHAiOjE2OTE1MjA5MDUsImp0aSI6ImU1Yjg1NTM3MjI3NWYwZDgwYTBmM2JlNzY5NzBkYjg2YzRhNGNmZGYifQ.SrMc1uTO4yV-kW3PGfW0AaVOcL1NH6mVXVDGU7c3xcAamuJ-s0-a8eagy9K_p77GJ0sjwJhLGm2UkaFCfQHL1jGzTDIu8QQ6rzL5ApvWxENyq3kLT1jrLTUiswKzuQcc7D2fSU7zmvsdvrKgBuWKiLSmvmYbucszM7yxlsyABRqD5qi6WRk1koKE0eKe9WHN6virYGISJa4KRDkdFuVMj1vXiN9VkcmFf7xOjqy7MibNT5nOTTTSJRimVlJTPR8uxO6Zs9ylZ4K4X32Sio9bCfPcWOQ-jSFQHJgGAegBELyBc3aag_QVBdRWk9YRaUtC-RbWSEqp1yCRuGp_AxKDOw"
    // select_by
    // : 
    // "btn"

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