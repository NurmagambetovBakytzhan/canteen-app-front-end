import RegistrationForm from "./components/registration/RegistrationForm";
import RegistrationConfirmation from "./components/registration-confirmation/RegistrationConfirmation";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import FoodDetail from "./components/foodDetail/FoodDetail";
import "./App.css";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/menu/" element={<Menu/>}/>
                    <Route path="/registration" element={<RegistrationForm/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration-confirmation" element={<RegistrationConfirmation/>}/>
                    <Route path="/food/:id" element={<FoodDetail/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
