import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store/store.js';
import { Provider } from 'react-redux'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3001/";
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)