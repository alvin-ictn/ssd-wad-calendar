import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import './App.css';
import { useState } from 'react';
import { GAPIbaseURL, calendarEventReadOnlyURL, calendarEventURL, calendarReadOnlyURL, calendarURL } from './constants';

function App() {
  const [token, setToken] = useState("")
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };
  const handleUserLogin = useGoogleLogin({
    scope: [calendarURL, calendarEventURL, calendarReadOnlyURL, calendarEventReadOnlyURL].join(" "),
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      let expires = (new Date(Date.now() + codeResponse.expires_in * 1000)).toUTCString();
      document.cookie = `ssd-wad-calendar-token=${codeResponse.access_token}; expires=${expires};path=/;`;
    },
  });
  return (
    <div className="App">
      {/* <button onClick={() => handleUserLogin()}>
        Sign in with Google 🚀{' '}
      </button>; */}
    </div>
  );
}

export default App;
