import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"; 
import CreateProduct from './components/createProduct/CreateProduct'; 
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import DeleteProduct from "./components/deleteProduct/DeleteProduct";
import ShoppingCart from "./components/shoppingCart/ShoppingCart";
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
import ListProducts from "./components/ListProducts/listProducts";
import { ToastContainer} from 'react-toastify'
import ErrorView from "./components/error404/Error404";
import Loading from "./components/loading/Loading";

const App = () => {
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.user)

  const [token, setToken] = useState()
  const { isAuthenticated, user, getIdTokenClaims, logout, loginWithRedirect } = useAuth0()
  const [loading,setLoading] = useState(false)

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true)}
    , 1500);
  
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/productsList" element={!loading ? <Loading/> :<ListProducts/>} />
          <Route path="/createProduct" element={!loading ? <Loading/> :<CreateProduct/>} />
          <Route path="/updateProduct/:id" element={!loading ? <Loading/> :<UpdateProduct/>} />
          <Route path="/deleteProduct/:id" element={!loading ? <Loading/> :<DeleteProduct />} />
          <Route path="/shopping" element={!loading ? <Loading/> :<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/myProfile" element={!loading ? <Loading/> :<MyProfile />} />
          <Route path="/paymentGateway" element={!loading ? <Loading/> :<PaymentGateway />} />
          <Route path="/paymentGateway/status" element={!loading ? <Loading/> :<PaymentStatus />} />
          <Route path="/adminPanel" element={!loading ? <Loading/> :<AdminPanel />} />
          <Route path="/adminPanel/users" element={!loading ? <Loading/> :<AdminModuleUser />}/>
          <Route path="/adminPanel/users/updateUser/:id" element={!loading ? <Loading/> :<AdminModuleUpdateUser/>} />
          <Route path="/adminPanel/users/deleteUser/:id" element={!loading ? <Loading/> :<AdminModuleDeleteUser/>} />
          <Route path="/adminPanel/users/orderHistory/:id" element={!loading ? <Loading/> :<ModuleHistoryOrderUser/>} />
          <Route path="/loading" element={<Loading/>}/>
          <Route path="*" element={<ErrorView/>}/>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
