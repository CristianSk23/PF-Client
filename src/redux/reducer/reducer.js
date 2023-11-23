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

    default:
      return { ...state };
  }
};
export default reducer;
