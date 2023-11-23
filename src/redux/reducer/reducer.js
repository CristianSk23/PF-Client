import {  
  ERROR, 
  GETALLPRODUCTS, 
  GETUSERS, 
  ORDERPRICE, 
  FILTERTYPE, 
  FILTERPRICE, 
  PAGINATION, 
  SEARCHPRODUCTS, 
  PRODUCTSINCART 
} from "../action/actionsType";

const initialState = {

  products: {
    data: [], //products to render
    allProducts: [], //backup 
    currentPage: 0,
    productsFiltered: [],
    filterType: null, // orderPrice, productsSearched, filterType, etc.
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
              productsFiltered: []
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

        case ORDERPRICE:

            if(state.products.filterType === null) {
            state.products.productsFiltered = action.payload === "A" ? [...state.products.allProducts].sort((a, b) => b.price - a.price)
            : [...state.allProducts].sort((a, b) => a.price - b.price)
            }
            
            else if(state.products.filterType !== null) {
            state.products.productsFiltered = action.payload === "A" ? [...state.products.productsFiltered].sort((a, b) => b.price - a.price)
            : [...state.allProducts].sort((a, b) => a.price - b.price)
            }

            return {}

        case PAGINATION:
            console.log(state.products.allProducts.length)
            const next_page = state.products.currentPage + 1;
            const prev_page = state.products.currentPage - 1;
            const firstindex = action.payload === "next" ? next_page*ITEM_PER_PAGE : prev_page*ITEM_PER_PAGE
              
            if(action.payload === "next" && firstindex >= state.products.allProducts.length) return state   
            if(action.payload === "prev" && prev_page <0 ) return state

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
