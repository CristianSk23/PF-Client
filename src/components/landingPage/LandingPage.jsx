import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  changePage,
  getProductsByName,
  createUser,
  typeUser
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { ShoppingCart } from "../shoppingCart/ShoppingCart";
import { useAuth0 } from "@auth0/auth0-react";



const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);
  const isUser = useSelector((state) => state.isUser)
  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };
  const [token, setToken] = useState()
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0()

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw;
        setToken(idToken);
      } catch (error) {
        console.error('Error fetching id token:', error);
      }
    };
  
    if (isAuthenticated) {
      fetchToken();
    }
  }, [isAuthenticated])

  useEffect(() => {
    if(isAuthenticated) dispatch(createUser(user?.email, token));
  }, [token])

  useEffect(() => {
    if(token) dispatch(typeUser(user?.email))
}, [isAuthenticated, token])

  // obtengo los productos
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [filterCond, setFilterCond] = useState({
    type: "all",
    price: "all",
    order: "ascendent",
  });
  const [aux, setAux] = useState(false);

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const reset = (event) => {
    dispatch(getAllProducts());
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "all";
    });
  };

  return (
    <div className={styles.container}>
    
        <PromotionPopup />
        <NavBar
          onSearch={onSearch}
          setFilterCond={setFilterCond}
          filterCond={filterCond}
          setAux={setAux}
          aux={aux}
        />

        {/*<SideBar />
        <p>Filters</p>
        <DropdownMenu /> Comento estos componentes ya que hice unos nuevos*/}

<FilterAndOrder
          setFilterCond={setFilterCond}
          filterCond={filterCond}
          setAux={setAux}
        />


      <div className="pagination justify-content-center">
        <button 
          type="button" 
          className="form-control" 
          style={{ width: '50px', textAlign:"center", marginTop:"5px", height:"37.6px"}}
          onClick={reset}
        >
        <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>

      <Cards products={products}/>

      <ShoppingCart products={products}/>

      <nav aria-label="Page navigation example" style={{ marginTop: "22px" }}>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="prev"
              style={{ cursor: "default" }}
            >
              {"<<"} Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="next"
              style={{ cursor: "default" }}
            >
              Next {">>"}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;

