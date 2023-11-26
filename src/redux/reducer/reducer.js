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

const initialState = {
  products: {
    data: [], //products to render
    allProducts: [], //backup
    currentPage: 0,
    productsFiltered: [],
    filterType: undefined, // orderPrice, productsSearched, filterType, etc.
  },
  users: [],
  productsInCart: [],
  prodCategories: [],
  singleProduct: "",
  catchError: "",
};

const reducer = (state = initialState, action) => {
  const ITEM_PER_PAGE = 10;

  switch (action.type) {
    case GETALLPRODUCTS:
      return {
        ...state,
        products: {
          data: [...action.payload].splice(0, ITEM_PER_PAGE),
          allProducts: action.payload,
          currentPage: 0,
          productsFiltered: [],
        },
      };

    case GET_PROD_CATEGORIES:
      return { ...state, prodCategories: action.payload };

    case CREATE_PRODUCT:
      console.log(state.products.allProducts);
      //...state,
      //products: {
      //  ...state.products,
      //  data: [...state.products.
      //  return {
      return {
        ...state,
        products: {
          ...state.products,
          allProducts: [...state.products.allProducts, action.payload],
        },
      };
    //return { ...state, products.allProducts: [...products.allProducts, action.payload] };

    case UPDATE_PRODUCT:
      const updatedProducts = state.products.allProducts.filter((product) => {
        return product.prodName !== action.payload.prodName;
      });
      return {
        products: {
          ...state,
          allProducts: [...updatedProducts, action.payload],
        },
      };

    case GET_PROD_BY_ID:
      return { ...state, singleProduct: action.payload };

    case DELETE_PRODUCT:
      const deletedProduct = state.products.allProducts.filter((product) => {
        return product.id != action.payload.id;
      });

      // const deletedProduct = state.products.allProducts.map((product)=>{
      //   if(product.id === action.payload.id){
      //     product.active = false
      //   }
      //   return product
      // })
      return {
        product: {
          ...state,
          allProducts: deletedProduct,
        },
      };

    case ERROR:
      return { ...state, catchError: action.payload };

    case GETUSERS:
      return {
        ...state,
        users: action.payload,
      };

    case SEARCHPRODUCTS:
      return {
        ...state,
        products: {
          ...products,
          data: [action.payload].splice(0, ITEM_PER_PAGE),
          productsFiltered: action.payload,
          filterType: "productsSearched",
        },
      };

     //-------------------------------- ORDERS ---------------------------------------------//
        
     case ORDERNAME:
           
     if(state.products.productsFiltered.length === 0) {
      console.log(state.products.productsFiltered);
       state.products.productsFiltered = action.payload === "A" ? [...state.products.allProducts].sort((a, b) => a.nameProd.localeCompare(b.nameProd))
      : [...state.products.allProducts].sort((a, b) => b.nameProd.localeCompare(a.nameProd))
      }
      
      else if(state.products.productsFiltered.length > 0) {
        console.log(state.products.productsFiltered);
      state.products.productsFiltered = action.payload === "A" ? [...state.products.productsFiltered].sort((a, b) => a.nameProd.localeCompare(b.nameProd))
      : [...state.products.productsFiltered].sort((a, b) => b.nameProd.localeCompare(a.nameProd))
      } 
      
      return {
        ...state,
        products: {
          ...state.products,
          data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
          currentPage: 0,
          filterType: "orderName",
        }
        
      }

     case ORDERPRICE:
         
       if (
         state.products.productsFiltered.length !== 0 ||  
         state.products.productsFiltered.length !== 0
       ) {
         let minarr;
         if (state.products.productsFiltered.length < state.products.productsFiltered.length) {
           minarr = [...state.products.productsFiltered];
         } else {
           minarr = [...state.products.productsFiltered];
         }
     
         state.products.productsFiltered = action.payload === "A"
           ? minarr.sort((a, b) => b.price - a.price)
           : minarr.sort((a, b) => a.price - b.price);
     
         return {
           ...state,
           products: {
             ...state.products,
             data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
             currentPage: 0,
           },
         };
       }

         state.products.productsFiltered = action.payload === "A" ? [...state.products.allProducts].sort((a, b) => b.price - a.price)
         : [...state.products.allProducts].sort((a, b) => a.price - b.price)
         
         return {
           ...state,
           products: {
             ...state.products,
             data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
             currentPage: 0,
             filterType: "orderPrice",
           }
         }



     // --------------------------------FILTROS --------------------------------------------//
     case FILTER:

         let filtered = [...state.products.allProducts];
         
         if(action.payload.type !== "all"){
          console.log(action.payload.type)
          console.log(filtered);
           filtered = filtered.filter((product) =>
           ///////////REVISAR
           product.category == action.payload.type)
           
         }
         
         
         if(action.payload.price !== "all"){
           if(action.payload.price === "100"){
             filtered = [...filtered].filter((product) =>
             product.price < action.payload.price)
             }
   
             if(action.payload.price === "300"){
             filtered = [...filtered].filter((product) =>
             product.price <= action.payload.price && product.price >= 100)
             }
   
             if(action.payload.price === "500"){
             filtered = [...filtered].filter((product) =>
             product.price > 301)
             }
         }
         console.log("REDUCER");
         console.log(filtered);
         
         return {
           ...state,
           products: {
           ...state.products,
           data: [...filtered].splice(0, ITEM_PER_PAGE),
           productsFiltered: [...filtered],
           currentPage: 0,
         }
         }


     // -------------------------------- PAGINATION --------------------------------------- //

     case PAGINATION:
         
         const next_page = state.products.currentPage + 1;
         const prev_page = state.products.currentPage - 1;
         const firstindex = action.payload === "next" ? next_page*ITEM_PER_PAGE : prev_page*ITEM_PER_PAGE
         
         if(action.payload === "next" && firstindex >= state.products.allProducts.length) return state   
         if(action.payload === "prev" && prev_page <0 ) return state
         
         if(state.products.productsFiltered.length > 0) {
           
         if(action.payload === "next" && firstindex >= state.products.productsFiltered.length) return state   
         if(action.payload === "prev" && prev_page <0 ) return state

         return {
           ...state,
           products: {
             ...state.products,
             data: [...state.products.productsFiltered].splice(firstindex, ITEM_PER_PAGE),
             currentPage: action.payload === "next" ? next_page : prev_page,
           }
         }

         }  

         return {
           ...state,
           products: {
             data: [...state.products.allProducts].splice(firstindex, ITEM_PER_PAGE),
             allProducts: [...state.products.allProducts],
             currentPage: action.payload === "next" ? next_page : prev_page,
             productsFiltered: []
                       },

                 }


    case SEARCHBYNAME:
      return {
        ...state,
        products: {
          data: [...action.payload].splice(0, ITEM_PER_PAGE),
          //allProducts: action.payload,
          currentPage: 0,
          productsFiltered: action.payload,
        },
      };
    default:
      return { ...state };
  }
};
export default reducer;
