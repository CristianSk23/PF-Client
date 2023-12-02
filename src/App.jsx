import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"; // Eliminar
import CreateProduct from './components/createProduct/CreateProduct'; //eliminar
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import DeleteProduct from "./components/deleteProduct/DeleteProduct";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Profile from "./components/profile/Profile";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import MyProfile from "./components/myProfile/myProfile";


const App = () => {

  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/createProduct" element={<CreateProduct/>} />
          <Route path="/updateProduct/:id" element={<UpdateProduct/>} />
          <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
          <Route path="/shopping" element={<ShoppingCart />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
