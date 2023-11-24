//import axios from "axios";
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
          PRODUCTSINCART 
        } from "../action/actionsType";

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

export const getUsers = () => {
  return async function(dispatch) {
      const apiData = await axios.get("")
      const users = apiData.data;
      dispatch({ type: GET_USERS, payload: users})
  }
}

export const orderPrice = (order) => {
  return {type: ORDERPRICE, payload: order}
}

export const orderName = (order) => {
  return {type: ORDERNAME, payload: order}
}

export const filterType = (type) => {
  return {type: FILTERTYPE, payload: type}
}

export const filterPrice = (price) => {
  return {type: FILTERPRICE, payload: price}
}

export const changePage = (order) => {
  return {type: PAGINATION, payload: order} 
}

export const searchProducs = (products) => {
  return async function(dispatch) {
      try {
          const response = await axios.get(`${products}`)// VER PORQUE ESTA FUNCIONALIDAD DEBE VENIR DEL BACK

          dispatch(
              {type: SEARCH_PRODUCTS,
               payload: response.data}
          )
      } catch(error) {
          alert(error.response.data.error)
      }
  }
}

export const productsInCart = (products) => {
  return {type: PRODUCTS_INCART, payload: products}
}
