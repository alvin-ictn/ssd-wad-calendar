import { useGoogleLogin } from '@react-oauth/google';
import './App.css';
import { calendarEventReadOnlyURL, calendarEventURL, calendarReadOnlyURL, calendarURL } from './constants';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate()
  const handleUserLogin = useGoogleLogin({
    scope: [calendarURL, calendarEventURL, calendarReadOnlyURL, calendarEventReadOnlyURL].join(" "),
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      let expires = (new Date(Date.now() + codeResponse.expires_in * 1000)).toUTCString();
      document.cookie = `ssd-wad-calendar-token=${codeResponse.access_token}; expires=${expires};path=/;`;
      navigate("/calendar")
    },
  });

  return (
    <div className="App">
      <button onClick={() => handleUserLogin()}>
        Sign in with Google 🚀{' '}
      </button>;
    </div>
  );
}

export default App;
