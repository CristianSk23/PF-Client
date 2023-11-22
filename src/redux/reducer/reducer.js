import { ERROR, GETALLPRODUCTS } from "../action/actionsType";

const initialState = {
  allProducts: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLPRODUCTS:
      return { ...state, allProducts: action.payload };
    case ERROR:
      return { ...state}
    default:
      return { ...state };
  }
};
export default reducer;
