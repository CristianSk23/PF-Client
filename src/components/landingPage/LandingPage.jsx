import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  changePage,
  getProductsByName,
  createUser,
  typeUser,
  logOut,
  getCountry 
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";


const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);
  const userAuth = useSelector((state) => state.user)
  const isUser = useSelector((state) => state.isUser)
  const [isLoggingOut, setIsLoggingOut] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderPromotionPopup, setShouldRenderPromotionPopup] = useState(false);
  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };
  const [token, setToken] = useState()
  const { isAuthenticated, user, getIdTokenClaims, logout, loginWithRedirect } = useAuth0()

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw;
        setToken(idToken);
      } catch (error) {
        console.error('Error fetching id token:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserInformation();
    }
  }, [isAuthenticated, getIdTokenClaims]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        console.log(user?.email);
        await dispatch(createUser(user?.email, token));
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token, user]);

  useEffect(() => {
    if (userAuth?.email) {
      console.log(userAuth.typeUser);
      dispatch(typeUser(userAuth.typeUser));

    }
    if (!userAuth.typeUser) {
      console.log(true);
      setShouldRenderPromotionPopup(true);
    }

    setIsLoading(false); // Mark user information as loaded
  }, [userAuth]);

  useEffect(() => {
    if (userAuth?.CountryId) {
      console.log(userAuth?.CountryId);
      dispatch(getCountry(userAuth?.CountryId));
    }
  }, [userAuth]);


  useEffect(() => {
    if (userAuth?.typeUser === "Admin") {
      setShouldRenderPromotionPopup(false);
    }
  }, [userAuth.typeUser]);

  useEffect(() => {
    if (user) {
      console.log(false);
      setShouldRenderPromotionPopup(false);
    }
  }, [loginWithRedirect]);

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

