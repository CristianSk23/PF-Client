import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

const App = () => {
  // url general
  axios.defaults.baseURL = "http://localhost:3000/";

  return (
    <div>
      <h1>App</h1>
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
};

export default App;
