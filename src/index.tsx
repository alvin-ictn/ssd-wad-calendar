import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import CalendarContext from './components/CalendarLayout';
import './index.css';
import Calendar from './pages/Calendar';
import CreateCalendar from './pages/CreateEvent';
import ViewEvent from './pages/ViewEvent';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './routes/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const routesFromElements = createRoutesFromElements(
  <Route element={<CalendarContext />}>
    <Route index element={<App />} errorElement={<ErrorPage />} />
    <Route
      path="/calendar"
      element={<Calendar />}
    ></Route>
    <Route
      path="/calendar/create"
      element={<CreateCalendar />}
    />
    <Route
      path="/calendar/:eventId"
      element={<ViewEvent />}
    />
  </Route>
);

const router = createBrowserRouter(routesFromElements);


root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
