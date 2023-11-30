import { UserType } from "../../utils/userType";
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
} from "../action/actionsType";

const initialState = {
  products: {
    data: [], //products to render
    allProducts: [], //backup
    currentPage: 0,
    productsFiltered: [],
    productsSearch: [],
    filterType: undefined, // orderPrice, productsSearched, filterType, etc.
    nameSearch: ""
  },
  users: [],
  prodCategories: [],
  singleProduct: "",
  catchError: "",
  isShowPopup: true,
  cart: {
    items: [],
  },
  isUser: UserType.ADMIN,
};

const reducer = (state = initialState, action) => {
  const ITEM_PER_PAGE = 12;

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

    case GETPRODCATEGORIES:
      return { ...state, prodCategories: action.payload };

    case CREATEPRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          allProducts: [...state.products.allProducts, action.payload],
        },
      };
    //return { ...state, products.allProducts: [...products.allProducts, action.payload] };

    case UPDATEPRODUCT:
      const updatedProducts = state.products.allProducts.filter((product) => {
        return product.prodName !== action.payload.prodName;
      });
      return {
        products: {
          ...state,
          allProducts: [...updatedProducts, action.payload],
        },
      };

    case GETPRODBYID:
      return { ...state, singleProduct: action.payload };

    case CLEANSINGLEPROD:
      return { ...state, singleProduct: action.payload };

    case DELETEPRODUCT:
      const deletedProduct = state.products.allProducts.filter((product) => {
        return product.id != action.payload;
      });
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

    //-------------------------------- ORDERS ---------------------------------------------//

    case ORDERNAME:
      if (state.products.productsFiltered.length === 0) {
        state.products.productsFiltered =
          action.payload === "A"
            ? [...state.products.allProducts].sort((a, b) =>
                a.nameProd.localeCompare(b.nameProd)
              )
            : [...state.products.allProducts].sort((a, b) =>
                b.nameProd.localeCompare(a.nameProd)
              );
      } else if (state.products.productsFiltered.length > 0) {
        state.products.productsFiltered =
          action.payload === "A"
            ? [...state.products.productsFiltered].sort((a, b) =>
                a.nameProd.localeCompare(b.nameProd)
              )
            : [...state.products.productsFiltered].sort((a, b) =>
                b.nameProd.localeCompare(a.nameProd)
              );
      }

      return {
        ...state,
        products: {
          ...state.products,
          data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
          currentPage: 0,
          filterType: "orderName",
        },
      };

    case ORDERPRICE:
      if (
        state.products.productsFiltered.length !== 0 ||
        state.products.productsFiltered.length !== 0
      ) {
        let minarr;
        if (
          state.products.productsFiltered.length <
          state.products.productsFiltered.length
        ) {
          minarr = [...state.products.productsFiltered];
        } else {
          minarr = [...state.products.productsFiltered];
        }

        state.products.productsFiltered =
          action.payload === "A"
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

      state.products.productsFiltered =
        action.payload === "A"
          ? [...state.products.allProducts].sort((a, b) => b.price - a.price)
          : [...state.products.allProducts].sort((a, b) => a.price - b.price);

      return {
        ...state,
        products: {
          ...state.products,
          data: [...state.products.productsFiltered].splice(0, ITEM_PER_PAGE),
          currentPage: 0,
          filterType: "orderPrice",
        },
      };

    // --------------------------------FILTROS --------------------------------------------//
    case FILTER:
      try {
        let filtered = state.products && state.products.productsSearch && state.products.productsSearch.length !== 0
        ? [...state.products.productsSearch]
        : [...state.products.allProducts];
      
            if (action.payload.type !== "all") {
              filtered = filtered.filter(
                (product) =>
                  ///////////REVISAR
                  product.category == action.payload.type
              );
            }
      
            if (action.payload.price !== "all") {
              if (action.payload.price === "100") {
                filtered = [...filtered].filter(
                  (product) => product.price < action.payload.price
                );
              }
      
              if (action.payload.price === "300") {
                filtered = [...filtered].filter(
                  (product) =>
                    product.price <= action.payload.price && product.price >= 100
                );
              }
      
              if (action.payload.price === "500") {
                filtered = [...filtered].filter((product) => product.price > 301);
              }
            }
      
            return {
              ...state,
              products: {
                ...state.products,
                data: [...filtered].splice(0, ITEM_PER_PAGE),
                productsFiltered: [...filtered],
                currentPage: 0,
              },}
      } catch (error) {
        //console.error('Error en la acción FILTER:', error);
        
        return {...state,
          catchError: error }
      }

    // -------------------------------- PAGINATION --------------------------------------- //

    case PAGINATION:
      const next_page = state.products.currentPage + 1;
      const prev_page = state.products.currentPage - 1;
      const firstindex =
        action.payload === "next"
          ? next_page * ITEM_PER_PAGE
          : prev_page * ITEM_PER_PAGE;

      if (
        action.payload === "next" &&
        firstindex >= state.products.allProducts.length
      )
        return state;
      if (action.payload === "prev" && prev_page < 0) return state;

      if (state.products.productsFiltered.length > 0) {
        if (
          action.payload === "next" &&
          firstindex >= state.products.productsFiltered.length
        )
          return state;
        if (action.payload === "prev" && prev_page < 0) return state;

        return {
          ...state,
          products: {
            ...state.products,
            data: [...state.products.productsFiltered].splice(
              firstindex,
              ITEM_PER_PAGE
            ),
            currentPage: action.payload === "next" ? next_page : prev_page,
          },
        };
      }

      return {
        ...state,
        products: {
          data: [...state.products.allProducts].splice(
            firstindex,
            ITEM_PER_PAGE
          ),
          allProducts: [...state.products.allProducts],
          currentPage: action.payload === "next" ? next_page : prev_page,
          productsFiltered: [],
        },
      };

    case ADDTOCART:
      
    const existingItem = state.cart.items.find((item) => item.id === action.payload.id);

    if (existingItem) {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        },
      };
    } else {
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [...state.cart.items, { ...action.payload, quantity: 1 }],
        },
      };
    }

    case REMOVEONECART: 

      let filteredItems = state.cart.items.filter(
        (product) =>
          product.id !== action.payload
      );

      return{
          ...state,
          cart: {
            ...state.cart,
            items: filteredItems, 
          }
          }
    
    case INCREASEQUANTITY:

    return {
      ...state,
      cart: {
        ...state.cart,
        items: state.cart.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      },
    };

    case DECREASEQUANTITY:

    let itemToDec = (state.cart.items.find((item) => item.id === action.payload));
    console.log(itemToDec.quantity)

    if(itemToDec.quantity<=1) {

        let filteredItemsDEC = state.cart.items.filter(
          (product) =>
            product.id !== action.payload
        );
  
        return{
            ...state,
            cart: {
              ...state.cart,
              items: filteredItemsDEC, 
            }
            }
      }
    
     else {

    return {
      ...state,
      cart: {
        ...state.cart,
        items: state.cart.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
      },
    };
    };



    case GETPRODUCTBYNAME:
      return {
        ...state,
        products: {
          ...state.products,
          data: [...action.payload].splice(0, ITEM_PER_PAGE),
          productsSearch: action.payload,
          currentPage: 0,
          productsFiltered: action.payload,
        },
      };
    case POPUPINITIAL:
      return {
        ...state,
        isShowPopup: action.payload,
      };
    case TYPEUSER:
      return {
        ...state,
        isUser: action.payload,
      };
      case CLEANSEARCHBAR:
      return {
        ...state,
      products: {
          ...state.products,
          productsSearch: action.payload,
    },
    nameSearch: "", // También asegúrate de limpiar nameSearch si es necesario
  };
    case NAMESEARCH: 
      return{
        ...state, 
        nameSearch: action.payload
      }
    default:
      return { ...state };
  }
};
export default reducer;

/*
case ADD_CART:
            if(state.numberCart==0){
                let cart = {
                    id:action.payload.id,
                    quantity:1,
                    name:action.payload.name,
                    image:action.payload.image,
                    price:action.payload.price
                } 
                state.Carts.push(cart); 
            }
            else{
                let check = false;
                state.Carts.map((item,key)=>{
                    if(item.id==action.payload.id){
                        state.Carts[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        id:action.payload.id,
                        quantity:1,
                        name:action.payload.name,
                        image:action.payload.image,
                        price:action.payload.price
                    }
                    state.Carts.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.Carts[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.Carts[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.Carts[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
            case DELETE_CART:
                let quantity_ = state.Carts[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - quantity_,
                    Carts:state.Carts.filter(item=>{
                        return item.id!=state.Carts[action.payload].id
                    })
                   
                }*/