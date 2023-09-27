import RegistrationForm from "./components/registration/RegistrationForm";
import RegistrationConfirmation from "./components/registration-confirmation/RegistrationConfirmation";
import {BrowserRouter, Route, Routes} from 'react-router-dom';


import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";


function App() {
    return (
        <div className="App">
            <h1>Hello</h1>
            <Menu/>
            <BrowserRouter>
                <Routes>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/registration" element={<RegistrationForm/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration-confirmation" element={<RegistrationConfirmation/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
