import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  changePage,
  getProductsByName,
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);
  const isUser = useSelector((state) => state.isUser)
  const [shouldRenderPromotionPopup, setShouldRenderPromotionPopup] = useState(false);
  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };


  useEffect(() => {
    if (isUser === "Admin") {
      setShouldRenderPromotionPopup(false);
    } else {
      setShouldRenderPromotionPopup(true)
    }
  }, [isUser]);


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

      
       {shouldRenderPromotionPopup && <PromotionPopup />}
      

        <NavBar
          onSearch={onSearch}
          setFilterCond={setFilterCond}
          filterCond={filterCond}
          setAux={setAux}
          aux={aux}
        />

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