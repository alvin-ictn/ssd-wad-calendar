import { useGoogleLogin } from '@react-oauth/google';
import './App.css';
import { calendarEventReadOnlyURL, calendarEventURL, calendarReadOnlyURL, calendarURL } from './constants';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  const handleUserLogin = useGoogleLogin({
    scope: [calendarURL, calendarEventURL, calendarReadOnlyURL, calendarEventReadOnlyURL].join(" "),
    onSuccess: (codeResponse) => {
      let expires = (new Date(Date.now() + codeResponse.expires_in * 1000)).toUTCString();
      document.cookie = `ssd-wad-calendar-token=${codeResponse.access_token}; expires=${expires};path=/;`;
      navigate("/calendar")
    },
  });

  return (
    <div className="App flex items-center h-screen w-full justify-center">
      <button onClick={() => handleUserLogin()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Sign in with Google
      </button>
    </div>
  );
}

export default App;
