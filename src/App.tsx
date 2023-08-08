import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import './App.css';
import { useState } from 'react';
import { GAPIbaseURL, calendarEventReadOnlyURL, calendarEventURL, calendarReadOnlyURL, calendarURL } from './contants';

function App() {
  const [token, setToken] = useState("")
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };
  const onSuccess = useGoogleLogin({
    scope: [calendarURL, calendarEventURL, calendarReadOnlyURL, calendarEventReadOnlyURL].join(" "),
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      fetch(`${GAPIbaseURL}/calendar/v3/users/me/calendarList`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
          "Content-Type": "application/json",
        },
      }).then(res => {
        return res.json()
      }).then(z =>
        console.log(z))
      setToken(codeResponse.access_token);
    },
  });
  return (
    <div className="App">
      <button onClick={() => onSuccess()}>
        Sign in with Google 🚀{' '}
      </button>;
    </div>
  );
}

export default App;
