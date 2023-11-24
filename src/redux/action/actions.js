import axios from "axios";
import { ERROR, 
         GETALLPRODUCTS, 
         GET_PROD_CATEGORIES, 
         CREATE_PRODUCT, 
         UPDATE_PRODUCT,
         DELETE_PRODUCT  } from "./actionsType";
import { data } from "../../data";
const URLEXAMPLE = "http://localhost:3001";

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
export const getProdCategories = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`${URLEXAMPLE}/categories`);
      console.log('data: '+data);
      dispatch({
        type: GET_PROD_CATEGORIES,
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
export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`${URLEXAMPLE}/products`, product);
      dispatch({
        type: CREATE_PRODUCT,
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
export const updateProduct = (product) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`${URLEXAMPLE}/products`, product);
      dispatch({
        type: UPDATE_PRODUCT,
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
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`${URLEXAMPLE}/products`, id);
      dispatch({
        type: DELETE_PRODUCT,
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
