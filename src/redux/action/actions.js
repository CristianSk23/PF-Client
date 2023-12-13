import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  GETALLPRODUCTS,
  GETUSERS,
  GETUSERBYID,
  GETPRODBYID,
  DELETEUSER,
  GETPRODCATEGORIES,
  GETPRODUCTBYNAME,
  CREATEPRODUCT,
  UPDATEPRODUCT,
  DELETEPRODUCT,
  PAGINATION,
  ORDERPRICE,
  ORDERNAME,
  FILTER,
  ERROR,
  POPUPINITIAL,
  CLEANSINGLEPROD,
  ADDTOCART,
  REMOVEALLCART,
  REMOVEONECART,
  INCREASEQUANTITY,
  DECREASEQUANTITY,
  CLEANSEARCHBAR,
  NAMESEARCH,
  TYPEUSER,
  LOGOUT,
  GENERATEUSER,
  UPDATEUSER,
  INCREASESTOCK,
  DECREASESTOCK,
  POPUTSPROMOTIONS,
  GETALLDELETEDUSERS,
  GETALLDELETEDPRODUCTS,
  RESTOREUSERS,
  RESTOREPRODUCTS,
  SETPAGEADMIN,
  GETORDERS,
  GETORDERSBYUSERID,
  GET_ALL_ORDERS,
  FILTER_ORDER_NAME_PURCHASE,
  UPDATE_ORDER_STATUS,
  CREATEORDER,
  SENDREVIEWPRODUCT,
  GETCARTBYID,
  UPDATEUSERADMIN,
} from "../action/actionsType";

export const updateUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users`, user);
      dispatch({
        type: UPDATEUSER,
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

export const updateUserForAdmin = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users`, user);
      dispatch({
        type: UPDATEUSERADMIN,
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

// GET PARA TRAER PRODUCTOS, de momento se esta usando el que cree en el archivo data.js luego deberiamos de descomentar y modificar lo necesario
export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/products`);
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
      const response = await axios.get(`/categories`);
      dispatch({
        type: GETPRODCATEGORIES,
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
  return async (dispatch) => {
    try {
      const response = await axios.get(`/products/name?name=${name}`);
      dispatch({
        type: GETPRODUCTBYNAME,
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
      const response = await axios.post(`/products`, product);
      dispatch({
        type: CREATEPRODUCT,
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
      const response = await axios.put(`/products`, product);
      dispatch({
        type: UPDATEPRODUCT,
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
      const response = await axios.get(`/products/${id}`);
      dispatch({
        type: GETPRODBYID,
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

export const cleanSingleProd = () => {
  return { type: CLEANSINGLEPROD, payload: "" };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/products`, {
        data: { id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: DELETEPRODUCT,
        payload: id,
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
  return async (dispatch) => {
    const { data } = await axios.get("/users");
    dispatch({
      type: GETUSERS,
      payload: data,
    });
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/users/${id}`);
      dispatch({
        type: GETUSERBYID,
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

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/users/${id}`);
      dispatch({
        type: DELETEUSER,
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

export const orderPrice = (order) => {
  return { type: ORDERPRICE, payload: order };
};

export const orderName = (order) => {
  return { type: ORDERNAME, payload: order };
};

export const changePage = (order) => {
  return { type: PAGINATION, payload: order };
};

export const filter = (cond) => {
  return async (dispatch) => {
    return dispatch({
      type: FILTER,
      payload: cond,
    });
  };
};
export const showThePopup = (bol) => {
  return async (dispatch) => {
    return dispatch({
      type: POPUPINITIAL,
      payload: bol,
    });
  };
};

export const resetError = () => {
  return {
    type: ERROR,
    payload: "",
  };
};

export const addToCart = (userID, id, quantityPROD) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`products/${id}`);
      dispatch({
        type: ADDTOCART,
        payload: response.data,
      });

      const responseCart = await axios.post("cart/", {
        UserId: userID,
        productId: id,
        quantityProd: quantityPROD,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const removeOneCart = (id, nameProd, userID) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REMOVEONECART, payload: id });

      const responseCart = await axios.delete("cart/delete", {
        data: {
          nameProd: nameProd,
          UserId: userID,
        },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const increaseQuantity = (userID, id, quantityPROD) => {
  return async (dispatch) => {
    try {
      dispatch({ type: INCREASEQUANTITY, payload: id });

      const responseCart = await axios.put("cart/", {
        UserId: userID,
        productId: id,
        quantityProd: quantityPROD,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const decreaseQuantity = (userID, id, quantityPROD) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DECREASEQUANTITY, payload: id });

      const responseCart = await axios.put("cart/", {
        UserId: userID,
        productId: id,
        quantityProd: quantityPROD,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const createUser = (email, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/users/create`,
        { email, token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: GENERATEUSER,
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


export const typeUser = (typeUser) => {
  return (dispatch) => {
    dispatch({
      type: TYPEUSER,
      payload: typeUser,
    });
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: "",
    });
  };
};

export const cleanSearchBar = () => {
  return {
    type: CLEANSEARCHBAR,
    payload: [],
  };
};
export const setNameSearch = (nameSearch) => {
  return {
    type: NAMESEARCH,
    payload: nameSearch,
  };
};

export const getPromotions = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/products`);
    dispatch({ type: "POPUTSPROMOTIONS", payload: data });
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

export const getDeletedUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/users/deleted");
    dispatch({
      type: GETALLDELETEDUSERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const getDeletedProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("/products/deleted");
    dispatch({
      type: GETALLDELETEDPRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const restoreDeleteUsers = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/users/deleted/${id}`);
    dispatch({
      type: RESTOREUSERS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const restoreProducts = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/products/deleted/${id}`);
    dispatch({
      type: RESTOREPRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const setPageAdmin = (pageAdmin) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SETPAGEADMIN, payload: pageAdmin });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const getOrders = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/order/history`);
    dispatch({ type: GETORDERS, payload: data });
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

export const getOrdersByUserId = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/order/${id}`);
    dispatch({
      type: GETORDERSBYUSERID,
      payload: data,
    });
  };
};

export const allOrders = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/order/history`);
      dispatch({
        type: GET_ALL_ORDERS,
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
export const filterOrderPurchase = (nameSearch) => {
  return {
    type: FILTER_ORDER_NAME_PURCHASE,
    payload: nameSearch,
  };
};

export const updateOrderStatus = (orderId, newStatus) => {
  return async (dispatch) => {
    try {
      const response = await axios.put("/order/update", {
        idOrder: orderId,
        statusDelivery: newStatus,
      });
      dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: response.data, // Esto puede variar según la estructura de tu respuesta
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const createOrder = (paymentResults) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/payments/saveData`, paymentResults);
      dispatch({
        type: CREATEORDER,
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

export const postReview = (review) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/reviews/create`, {
        UserId: review.UserId,
        reviewText: review.reviewText,
        rating: review.rating,
        productId: review.productId,
      });
      dispatch({
        type: SENDREVIEWPRODUCT,
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

export const getCartById = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`cart/${userId}`);
      dispatch({
        type: GETCARTBYID,
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
export const increaseStock = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: INCREASESTOCK, payload: id });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const decreaseStock = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DECREASESTOCK, payload: id });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};
