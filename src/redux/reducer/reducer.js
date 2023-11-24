import { ERROR,
         GETALLPRODUCTS, 
         GET_PROD_CATEGORIES,
         CREATE_PRODUCT,
         UPDATE_PRODUCT,
         DELETE_PRODUCT } from "../action/actionsType";

const initialState = {
  allProducts: [],
  prodCategories: [],
  catchError:''
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLPRODUCTS:
      return { ...state, allProducts: action.payload };

    case GET_PROD_CATEGORIES:
      return { ...state, prodCategories: action.payload };

    case CREATE_PRODUCT:
      return { ...state, allProducts: [...state.allProducts, action.payload] };

    case UPDATE_PRODUCT:
      const updatedProducts = state.allProducts.filter((product)=>{
        return product.prodName !== action.paylod.prodName
      })
      return { ...state, allProducts: [...updatedProducts, action.paylod ] };

    case DELETE_PRODUCT:
      const  deletedProduct = state.allProducts.filter((product)=>{
        return product.id != action.payload.id
      })

      // const deletedProduct = state.allProducts.map((product)=>{
      //   if(product.id === action.payload.id){
      //     product.active = false
      //   }
      //   return product
      // })
      return { ...state, allProducts: deletedProduct};

    case ERROR:
      return { ...state, catchError: action.payload };

    default:
      return { ...state };
  }
};
export default reducer;
