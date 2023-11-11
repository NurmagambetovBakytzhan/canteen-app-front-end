import RegistrationForm from "./components/registration/RegistrationForm";
import RegistrationConfirmation from "./components/registration-confirmation/RegistrationConfirmation";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import FoodDetail from "./components/food-detail/FoodDetail";
import "./App.css";
import Cart from "./components/cart/cart";
import ManagerPage from "./pages/manager-page/ManagerPage";
import Order from "./shared/components/orders/Order";
import TopBar from "./components/top-bar/TopBar";
import UserPage from "./pages/user-page/UserPage";


function App() {
    const isManager = () => {
        return localStorage.getItem("user_type") === 'Manager';
    };



    console.log(isManager)
    return (
        <div className="App">
            <BrowserRouter>
                <TopBar/>
                <Routes>
                    <Route path="/menu" Component={Menu}/>
                    <Route path="/registration" Component={RegistrationForm}/>
                    <Route path="/login" Component={Login}/>
                    <Route path="/registration-confirmation" Component={RegistrationConfirmation}/>
                    <Route path="/food/:id" Component={FoodDetail}/>
                    <Route path="/cart" Component={Cart}/>
                    <Route path="/active-orders" Component={Order}/>
                    <Route path="/profile" Component={UserPage}/>
                    <Route path="/manager" Component={isManager() ? ManagerPage : Menu }/>
                    <Route path="*"  Component={Menu}/>
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
