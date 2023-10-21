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
import topBar from "./components/top-bar/TopBar";
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
                    <Route path="/menu" element={<Menu/>}/>
                    <Route path="/registration" element={<RegistrationForm/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration-confirmation" element={<RegistrationConfirmation/>}/>
                    <Route path="/food/:id" element={<FoodDetail/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/active-orders" element={<Order/>}/>
                    <Route path="/profile" element={<UserPage/>}/>
                    <Route path="/manager" element={isManager() ? <ManagerPage/> : <Menu/> }/>
                    <Route path="*"  element={<Menu/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );

}

export default App;
