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
  PRODUCTSINCART,
  GET_PROD_CATEGORIES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT 
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
      catchError:''
      };

const reducer = (state = initialState, action) => {

  const ITEM_PER_PAGE = 8;

  switch (action.type) {

    case GETALLPRODUCTS:
      return { 
              ...state,
              products: {
              data: [...action.payload].splice(0, ITEM_PER_PAGE),
              allProducts: action.payload,
              currentPage: 0,
              productsFiltered: []
                        } 
            };

    case GET_PROD_CATEGORIES:
      return { ...state, prodCategories: action.payload };

    case CREATE_PRODUCT:
      return { ...state, products.allProducts: [...state.allProducts, action.payload] };

    case UPDATE_PRODUCT:
      const updatedProducts = state.products.allProducts.filter((product)=>{
        return product.prodName !== action.paylod.prodName
      })
      return { ...state, products.allProducts: [...updatedProducts, action.paylod ] };

    case DELETE_PRODUCT:
      const  deletedProduct = state.products.allProducts.filter((product)=>{
        return product.id != action.payload.id
      })

      // const deletedProduct = state.products.allProducts.map((product)=>{
      //   if(product.id === action.payload.id){
      //     product.active = false
      //   }
      //   return product
      // })
      return { ...state, products.allProducts: deletedProduct};

    case ERROR:
      return { ...state, catchError: action.payload };

    case GETUSERS:
      return {
          ...state,
          users: action.payload,
      }

    case SEARCHPRODUCTS:
      return {
          ...state,
          products: {
              ...products,
              data: [action.payload].splice(0, ITEM_PER_PAGE),
              productsFiltered: action.payload,
              filterType: "productsSearched",
          }
      }

    case ORDERNAME:

      if(state.products.productsFiltered.length === 0) {
        state.products.productsFiltered = action.payload === "A" ? [...state.products.allProducts].sort((a, b) => a.nameProd.localeCompare(b.nameProd))
       : [...state.products.allProducts].sort((a, b) => b.nameProd.localeCompare(a.nameProd))
       }

       else if(state.products.productsFiltered.length > 0) {
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
            
            if(state.products.productsFiltered.length === 0) {
             state.products.productsFiltered = action.payload === "A" ? [...state.products.allProducts].sort((a, b) => b.price - a.price)
            : [...state.products.allProducts].sort((a, b) => a.price - b.price)
            }
            
            else if(state.products.productsFiltered.length > 0) {
            state.products.productsFiltered = action.payload === "A" ? [...state.products.productsFiltered].sort((a, b) => b.price - a.price)
            : [...state.products.productsFiltered].sort((a, b) => a.price - b.price)
            }
            
            return {
              ...state,
              products: {
                ...state.products,
                data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
                currentPage: 0,
                filterType: "orderPrice",
              }
              
            }

        case FILTERTYPE:
            
        if(state.products.filterType == "orderPrice" || state.products.filterType == "filterPrice" || state.products.filterType == "orderName") {

          state.products.productsFiltered = [...state.products.productsFiltered].filter((product) =>
          product.tags && product.tags.map(tag => tag).includes(action.payload))

          return {
            ...state,
            products: {
              ...state.products,
              data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
              currentPage: 0,
              filterType: "filterType",
            }
          }
        }

          state.products.productsFiltered = [...state.products.allProducts].filter((product) =>
          product.tags && product.tags.map((tag) => tag).includes(action.payload))

          return {
            ...state,
            products: {
              ...state.products,
              data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
              currentPage: 0,
              filterType: "filterType",
            }
          }
        
        case FILTERPRICE:

        if(state.products.filterType == "orderPrice" || state.products.filterType == "filterType" || state.products.filterType == "orderName") {

          if(action.payload === "100"){
          state.products.productsFiltered = [...state.products.productsFiltered].filter((product) =>
          product.price < action.payload)
          }

          if(action.payload === "300"){
          state.products.productsFiltered = [...state.products.productsFiltered].filter((product) =>
          product.price < action.payload && product.price >= 100)
          }

          if(action.payload === "500"){
          state.products.productsFiltered = [...state.products.productsFiltered].filter((product) =>
          product.price > action.payload)
          }

          return {
            ...state,
            products: {
              ...state.products,
              data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
              currentPage: 0,
              filterType: "filterPrice",
            }
          }
        }
          
          if(action.payload === "100"){
          state.products.productsFiltered = [...state.products.allProducts].filter((product) =>
          product.price < action.payload)
          }

          if(action.payload === "300"){
          state.products.productsFiltered = [...state.products.allProducts].filter((product) =>
          product.price < action.payload && product.price >= 100)
          }

          if(action.payload === "500"){
          state.products.productsFiltered = [...state.products.allProducts].filter((product) =>
          product.price > action.payload)
          }

          return {
            ...state,
            products: {
              ...state.products,
              data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
              currentPage: 0,
              filterType: "filterPrice",
            }
          }  

        case PAGINATION:
            
            const next_page = state.products.currentPage + 1;
            const prev_page = state.products.currentPage - 1;
            const firstindex = action.payload === "next" ? next_page*ITEM_PER_PAGE : prev_page*ITEM_PER_PAGE
            
            if(action.payload === "next" && firstindex >= state.products.allProducts.length) return state   
            if(action.payload === "prev" && prev_page <0 ) return state
            
            if(state.products.filterType == "orderPrice" || state.products.filterType == "filterType" || state.products.filterType == "filterPrice" || state.products.filterType == "orderName") {
              
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
    default:
      return { ...state };
  }
};
export default reducer;
