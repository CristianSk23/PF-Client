import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"; 
import CreateProduct from './components/createProduct/CreateProduct'; 
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import DeleteProduct from "./components/deleteProduct/DeleteProduct";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
import Profile from "./components/profile/Profile";
import Detail from "./components/detail/Detail";
import Login from "./components/login/Login";
import MyProfile from "./components/myProfile/myProfile";
import PaymentGateway from "./components/paymentGateway/PaymentGateway";
import PaymentStatus from "./components/paymentStatus/PaymentStatus";
import AdminPanel from "./components/adminPanel/adminPanel";
import AdminModuleUser from "./components/adminModuleUser/AdminModuleUser";
import AdminModuleUpdateUser from "./components/adminModuleUpdateUser/AdminModuleUpdateUser";
import AdminModuleDeleteUser from "./components/adminModuleDeleteUser/AdminModuleDeleteUser";
import ModuleHistoryOrderUser from "./components/moduleHistoryOrderUser/ModuleHistoryOrderUser"


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createUser, typeUser, getCountry } from "./redux/action/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer} from 'react-toastify'

const App = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user)

  const [token, setToken] = useState()
  const { isAuthenticated, user, getIdTokenClaims, logout, loginWithRedirect } = useAuth0()

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw;
        setToken(idToken);
      } catch (error) {
        console.error('Error fetching id token:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserInformation();
    }
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        await dispatch(createUser(user?.email, token));
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, user]);

  useEffect(() => {
    if (userAuth?.email) {
      dispatch(typeUser(userAuth.typeUser));
    }
  }, [userAuth]);

  useEffect(() => {
    if (userAuth?.CountryId) {
      dispatch(getCountry(userAuth?.CountryId));
    }
  }, [userAuth]);

  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/createProduct" element={<CreateProduct/>} />
          <Route path="/updateProduct/:id" element={<UpdateProduct/>} />
          <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
          <Route path="/shopping" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/paymentGateway" element={<PaymentGateway />} />
          <Route path="/paymentGateway/status" element={<PaymentStatus />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/adminPanel/users" element={<AdminModuleUser />}/>
          <Route path="/adminPanel/users/updateUser/:id" element={<AdminModuleUpdateUser/>} />
          <Route path="/adminPanel/users/deleteUser/:id" element={<AdminModuleDeleteUser/>} />
          <Route path="/adminPanel/users/orderHistory/:id" element={<ModuleHistoryOrderUser/>} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
