import {  
  ERROR, 
  GETALLPRODUCTS, 
  GETUSERS, 
  ORDERPRICE,
  ORDERNAME, 
  PAGINATION, 
  SEARCHPRODUCTS,
  FILTER,
  ORDER, 
  PRODUCTSINCART 
} from "../action/actionsType";

const initialState = {

  products: {
    data: [], //products to render
    allProducts: [], //backup 
    currentPage: 0,
    productsFiltered: [],
},
users: [],
productsInCart: [] 

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
              productsFiltered: [],
              productsFilteredPrice: [],
                        } 
            };

    case ERROR:
      return { ...state}

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

        //-------------------------------- ORDERS ---------------------------------------------//
        
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
              filtered = filtered.filter((product) =>
              product.tags && product.tags.map(tag => tag).includes(action.payload.type))
            }
            
            if(action.payload.price !== "all"){
              if(action.payload.price === "100"){
                filtered = [...filtered].filter((product) =>
                product.price < action.payload.price)
                }
      
                if(action.payload.price === "300"){
                filtered = [...filtered].filter((product) =>
                product.price < action.payload.price && product.price >= 100)
                }
      
                if(action.payload.price === "500"){
                filtered = [...filtered].filter((product) =>
                product.price > action.payload.price)
                }
            }

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

    default:
      return { ...state };
  }
};
export default reducer;
