import axios from "axios";
import {
  ERROR,
  GETALLPRODUCTS,
  GETUSERS,
  ORDERPRICE,
  ORDERNAME,
  FILTERTYPE,
  FILTERPRICE,
  PAGINATION,
  SEARCHPRODUCTS,
  SEARCHBYNAME,
  PRODUCTSINCART,
  GET_PROD_CATEGORIES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PROD_BY_ID,
  FILTER,
} from "../action/actionsType";
import {data} from "../../data"
const URLEXAMPLE = "http://localhost:3001";

// GET PARA TRAER PRODUCTOS, de momento se esta usando el que cree en el archivo data.js luego deberiamos de descomentar y modificar lo necesario
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      //const { data } = await axios.get(`${URLEXAMPLE}/products`);
      dispatch({
        type: GETALLPRODUCTS,
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
      const response = await axios.get(`${URLEXAMPLE}/categories`);
      dispatch({
        type: GET_PROD_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
export const getProductsByName = (name) => {
  console.log("Llegue aqui");
  console.log(name);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URLEXAMPLE}/products/name?name=${name}`
      );
      dispatch({
        type: SEARCHBYNAME,
        payload: response.data,
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
      const response = await axios.post(`${URLEXAMPLE}/products`, product);
      console.log("DESDE LA ACTIONS");
      console.log(response.data);
      dispatch({
        type: CREATE_PRODUCT,
        payload: response.data,
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
      const response = await axios.put(`${URLEXAMPLE}/products`, product);
      dispatch({
        type: UPDATE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getProductsById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URLEXAMPLE}/products/${id}`);
      dispatch({
        type: GET_PROD_BY_ID,
        payload: response.data,
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
      const response = await axios.delete(`${URLEXAMPLE}/products`, id);
      dispatch({
        type: DELETE_PRODUCT,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getUsers = () => {
  return async function (dispatch) {
    const apiData = await axios.get("");
    const users = apiData.data;
    dispatch({ type: GET_USERS, payload: users });
  };
};

export const orderPrice = (order) => {
  return { type: ORDERPRICE, payload: order };
};

export const orderName = (order) => {
  return { type: ORDERNAME, payload: order };
};

export const filterType = (type) => {
  return { type: FILTERTYPE, payload: type };
};

export const filterPrice = (price) => {
  return { type: FILTERPRICE, payload: price };
};

export const changePage = (order) => {
  return { type: PAGINATION, payload: order };
};

export const searchProducs = (products) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${products}`); // VER PORQUE ESTA FUNCIONALIDAD DEBE VENIR DEL BACK

      dispatch({ type: SEARCH_PRODUCTS, payload: response.data });
    } catch (error) {
      alert(error.response.data.error);
    }
  };
};

export const productsInCart = (products) => {
  return { type: PRODUCTS_INCART, payload: products };
};

export const filter=(cond, name)=>{
  return async (dispatch) => {
  cond.name= name.toLowerCase();
  return dispatch({ 
      type: FILTER, 
      payload: cond
      });
  }
}