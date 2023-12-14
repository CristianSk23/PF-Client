import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './redux/store/store.js';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'

  // url general
  //  axios.defaults.baseURL = "http://localhost:3001"; // LOCAL
  axios.defaults.baseURL = "https://technook-server.up.railway.app/"; // DEPLOY

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
      domain='dev-1uldl1sqj8jt3y8r.us.auth0.com'
      clientId="3Qwq7KCSQBXC4EVkT1WIVFXV63NQpN6e"
      authorizationParams={{
      redirect_uri: window.location.origin
      }}
      cacheLocation='localstorage'
    >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </Provider>
)