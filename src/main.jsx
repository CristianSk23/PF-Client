import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store.js';
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Auth0Provider
      domain='dev-1uldl1sqj8jt3y8r.us.auth0.com'
      clientId="3Qwq7KCSQBXC4EVkT1WIVFXV63NQpN6e"
      authorizationParams={{
      redirect_uri: window.location.origin
      }}
    >
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Auth0Provider>
  </Provider>
)