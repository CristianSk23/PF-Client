import axios from "axios";
import {useAuth0} from "@auth0/auth0-react"
import {
  GETALLPRODUCTS,
  GETUSERS,
  GETPRODBYID,
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
  COUNTRY,
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
      const response = await axios.get(
        `/products/name?name=${name}`
      );
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
    console.log(id);
    try {
      const response = await axios.get(`/products/${id}`);
      console.log(response.data);
      dispatch({
        type: GETPRODBYID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  };
};

export const cleanSingleProd =()=>{
  return { type: CLEANSINGLEPROD, payload: "" };
}
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
  return async function (dispatch) {
    const apiData = await axios.get("");
    const users = apiData.data;
    dispatch({ type: GETUSERS, payload: users });
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

export const resetError=()=>{
  return { 
      type: ERROR, 
      payload: ''
      }

    }

  export const addToCart = (userID, id, quantityPROD) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`products/${id}`);
        dispatch({
          type: ADDTOCART,
          payload: response.data,
        })
    
        const responseCart = await axios.post("cart/", {
         "UserId": userID,
         "productId": id,
         "quantityProd": quantityPROD
         })

      } catch (error) {
        console.log(error.message);
        dispatch({
          type: ERROR,
          payload: error.message,
        });
      }
    };
};

export const removeOneCart = (id, nameProd) => {
  return async (dispatch) => {
  try {
  dispatch({type: REMOVEONECART, payload: id
  })

  //obtenere id del carrito

  const responseCart = await axios.delete("cart/", {
    "nameProd": nameProd,
    //"cartId": id del carrito
    })

} 
  catch (error) {
  dispatch({
    type: ERROR,
    payload: error.message,
  });
  }
  }
  }

  export const increaseQuantity = (userID, id, quantityPROD) => {
    return async (dispatch) => {
      try{

        dispatch({type: INCREASEQUANTITY, payload: id})

        const responseCart = await axios.put("cart/", {
          "UserId": userID,
          "productId": id,
          "quantityProd": quantityPROD
          })

      }
      catch(error) {
        dispatch({
          type: ERROR,
          payload: error.message,
        })
      }
    }
  }

  export const decreaseQuantity = (userID, id, quantityPROD) => {
    return async (dispatch) => {
      try{
        dispatch({type: DECREASEQUANTITY, payload: id})

        const responseCart = await axios.put("cart/", {
          "UserId": userID,
          "productId": id,
          "quantityProd": quantityPROD
          })

      }
      catch(error) {
        dispatch({
          type: ERROR,
          payload: error.message,
        })
      }
    }
  }

export const createUser = (email, token) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/users/create`, 
        { email, token }, {
          headers: {
            "Content-Type": "application/json"
      }
    });
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
  }
}

export const getCountry = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`country/id?id=${id}`)
      dispatch({
        type: COUNTRY,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message,
      });
    }
  }
}

export const typeUser = (typeUser) => {
  return (dispatch) => {
    dispatch({
      type: TYPEUSER,
      payload: typeUser
    })
  }
}

export const logOut = () => {
  return (dispatch) => {
    dispatch({
    type: LOGOUT,
    payload: ""
    })
  }
}

export const cleanSearchBar=()=> {
  return {
      type: CLEANSEARCHBAR,
      payload: []
  }

}
export const setNameSearch = (nameSearch)=>{
  return {
    type: NAMESEARCH,
    payload: nameSearch
  }
}

