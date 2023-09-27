import RegistrationForm from "./components/registration/RegistrationForm";
import RegistrationConfirmation from "./components/registration-confirmation/RegistrationConfirmation";

import Login from "./components/login/Login";
function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <RegistrationForm />
      <RegistrationConfirmation />
      <Login/>
    </div>
  );
}

export default App;
