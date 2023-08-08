import { CredentialResponse, GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import './App.css';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState("")
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };
  const onSuccess = useGoogleLogin({
    scope: ["https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly"].join(""),
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      fetch(`https://www.googleapis.com/calendar/v3/users/me/calendarList`, {
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
