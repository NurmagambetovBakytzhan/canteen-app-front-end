import RegistrationForm from "./components/registration/RegistrationForm";
import RegistrationConfirmation from "./components/registration-confirmation/RegistrationConfirmation";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import FoodDetail from "./components/foodDetail/FoodDetail";
import "./App.css";
import Cart from "./components/cart/cart";
import GuardedRoute from "./shared/components/guraded-route/GuardedRoute";
import ManagerPage from "./pages/manager-page/ManagerPage";


function App() {
    const isManager = localStorage.getItem("user_type") === 'Manager'
    console.log(isManager)
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/registration" element={<RegistrationForm/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration-confirmation" element={<RegistrationConfirmation/>}/>
                    <Route path="/food/:id" element={<FoodDetail/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/manager" element={isManager ? <ManagerPage/> : <Menu/> }/>
                    <Route path="*"  element={<Menu/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
