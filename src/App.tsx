import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import './App.css';

function App() {

  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
  };

  return (
    <div className="App">
      <GoogleLogin onSuccess={responseMessage}  />
    </div>
  );
}

export default App;
