import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage"; // Eliminar
import CreateProduct from './components/createProduct/CreateProduct'; //eliminar
import UpdateProduct from "./components/updateProduct/UpdateProduct";
import DeleteProduct from "./components/deleteProduct/DeleteProduct";

const App = () => {
  return (
    <div>
      <Routes>
        <Route>
          <Route path="/" exact element={<LandingPage/>} />
          <Route path="/createProduct" element={<CreateProduct/>} />
          <Route path="/updateProduct/:id" element={<UpdateProduct/>} />
          <Route path="/deleteProduct/:id" element={<DeleteProduct />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
