import { UserType } from "../../utils/userType";
import {
  GETALLPRODUCTS,
  GETUSERS,
  GETUSERBYID,
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
  UPDATEUSER,
  GENERATEUSER,
  LOGOUT,
  COUNTRY,
  POPUTSPROMOTIONS,
  GETALLCOUNTRIES,
  SETPAGEADMIN,
  GETORDERS,
  GETORDERSBYUSERID,
  GET_ALL_ORDERS,
  FILTER_ORDER_NAME_PURCHASE,
  UPDATE_ORDER_STATUS,
} from "../action/actionsType";

const initialState = {
  products: {
    data: [], //products to render
    allProducts: [], //backup
    currentPage: 0,
    productsFiltered: [],
    productsSearch: [],
    filterType: undefined, // orderPrice, productsSearched, filterType, etc.
    nameSearch: "",
    promotionsProducts: [],
    singleProduct: "",
    orderHistory: [],
  },
  users: [],
  prodCategories: [],

  catchError: "",
  isShowPopup: true,
  cart: {
    items: [],
  },
  isUser: "Invited",
  user: {},
  country: "",
  countries: [],
  pageAdmin: "dassboard",
  ordersForUser: [],
  ordersForUserId: [],
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

    case UPDATEPRODUCT:
      const updatedProducts = state.products.allProducts.filter((product) => {
        return product.prodName !== action.payload.prodName;
      });
      return {
        ...state,
        products: {
          ...state.products,
          allProducts: [...updatedProducts, action.payload],
        },
      };

    case GETPRODBYID:
      return {
        ...state,
        products: {
          ...state.products,
          singleProduct: action.payload,
        },
      };

    case CLEANSINGLEPROD:
      return {
        ...state,
        products: {
          ...state.products,
          singleProduct: action.payload,
        },
      };

    case DELETEPRODUCT:
      const deletedProduct = state.products.allProducts.filter((product) => {
        return product.id != action.payload;
      });
      return {
        ...state,
        products: {
          ...state.products,
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

    case GETUSERBYID:
      return {
        ...state,
        user: action.payload,
      };

    case GETUSERBYID:
      return {
        ...state,
      };

    case UPDATEUSER:
      return { ...state, user: { ...state.user, ...action.payload } };

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
        let filtered =
          state.products &&
          state.products.productsSearch &&
          state.products.productsSearch.length !== 0
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
          },
        };
      } catch (error) {
        //console.error('Error en la acción FILTER:', error);

        return { ...state, catchError: error };
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
      if (action.payload.stock == 0) {
        alert("This product is out of stock");
        return {
          ...state,
        };
      }

      const existingItem = state.cart.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        if (action.payload.stock < existingItem.quantity + 1) {
          alert("There are no more units available for this product");

          return {
            ...state,
          };
        }

        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [{ ...action.payload, quantity: 1 }, ...state.cart.items],
          },
        };
      }

    case REMOVEONECART:
      let filteredItems = state.cart.items.filter(
        (product) => product.id !== action.payload
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          items: filteredItems,
        },
      };

    case INCREASEQUANTITY:
      let itemToCheck = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (itemToCheck.stock < itemToCheck.quantity + 1) {
        alert("There are no more units available for this product");

        return {
          ...state,
        };
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          items: state.cart.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        },
      };

    case DECREASEQUANTITY:
      let itemToDec = state.cart.items.find(
        (item) => item.id === action.payload
      );

      if (itemToDec.quantity <= 1) {
        let filteredItemsDEC = state.cart.items.filter(
          (product) => product.id !== action.payload
        );

        return {
          ...state,
          cart: {
            ...state.cart,
            items: filteredItemsDEC,
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: state.cart.items.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          },
        };
      }

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
      return {
        ...state,
        nameSearch: action.payload,
      };

    // -------------------------------- USERS --------------------------------------- //
    case GENERATEUSER:
      return {
        ...state,
        user: action.payload,
      };

    case TYPEUSER:
      return {
        ...state,
        isUser: action.payload,
      };

    case COUNTRY:
      return {
        ...state,
        country: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        user: { typeUser: "Invited" },
        isUser: "Invited",
        country: "",
      };
    case POPUTSPROMOTIONS:
      const promotionsProduct = action.payload.filter((product) => {
        return product.tags === "New";
      });

      return {
        ...state,
        products: {
          ...state.products,
          promotionsProducts: promotionsProduct,
        },
      };

    case GETALLCOUNTRIES:
      const ordenCountries = action.payload.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        ...state,
        countries: ordenCountries,
      };
    case SETPAGEADMIN: {
      return {
        ...state,
        pageAdmin: action.payload,
      };
    }
    case GETORDERS: {
      return {
        ...state,
        ordersForUser: action.payload,
      };
    }

    case GETORDERSBYUSERID: {
      
      return {
        ...state,
        ordersForUserId: action.payload,
      };
    }
    case GET_ALL_ORDERS:
      return {
        ...state,
        orderHistory: action.payload,
        orderHistoryCache: action.payload
      };
  
      case FILTER_ORDER_NAME_PURCHASE:
        const result = state.orderHistoryCache.filter(i=>i.mercadopagoTransactionStatus
          .toLowerCase().includes(action.payload.toLowerCase()))
      return {
        ...state,
        orderHistory: result
      };
    
      case UPDATE_ORDER_STATUS:
        const updatedOrders = state.orderHistory.map(order => {
          if (order.id === action.payload.orderId) {
            return { ...order, deliveryStatus: action.payload.newStatus };
          }
          return order;
        });
        return {
          ...state,
          orderHistory: updatedOrders
        };
  
      
    default:
      return { ...state };
  }
};
export default reducer;
