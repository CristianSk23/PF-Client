import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import store from './redux/store/store.js';
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

  // url general
  // axios.defaults.baseURL = "http://localhost:3001"; // LOCAL
  axios.defaults.baseURL = "https://technook-server.up.railway.app/"; // DEPLOY

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)