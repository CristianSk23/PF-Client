//import axios from "axios";
import { ERROR, GETALLPRODUCTS } from "./actionsType";
import { data } from "../../data";
//const URLEXAMPLE = "http://localhost:3001";

// GET PARA TRAER PRODUCTOS, de momento se esta usando el que cree en el archivo data.js luego deberiamos de descomentar y modificar lo necesario
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      //    const response = await axios.get(`${URLEXAMPLE}/products`);
      dispatch({
        type: GETALLPRODUCTS,
        //payload: response.data.products,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
