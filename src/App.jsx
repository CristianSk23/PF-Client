import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import LandingPage from "./components/landingPage/LandingPage"; // Eliminar

const App = () => {
  // url general
  axios.defaults.baseURL = "http://localhost:3000/";

  return (
    <div>
      <LandingPage /> 

      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
};

export default App;
