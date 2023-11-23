import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, changePage } from "../../redux/action/actions";
import SideBar from "../sideBar/SideBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SearchBar from "../searchBar/SearchBar";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);

  const onSearch = (id) => {
    console.log(id);
    // Falta implementar la busqueda atravez del id, logica en el reducer
  };

  // obtengo los productos
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const pagination = (event) => {
    dispatch(changePage(event.target.name))
  }

  const [resetSearch, setResetSearch] = useState(false);

  const reset = (event) => {
    dispatch(getAllProducts(event.target.name))
    const selectElements = document.querySelectorAll(".select-container select");
    selectElements.forEach((select) => {
    select.value = "";
    })
    setResetSearch(true)
  } 

  return (
    <div>
      <nav className={styles.navBar}>
        <SideBar />
        <p>Filters</p>
        <PromotionPopup />
        <SearchBar onSearch={onSearch} />
        <DropdownMenu />
      </nav>

      <div>
            <button onClick={pagination} name="prev">{"<<"}</button>
            <button onClick={pagination} name="next">{">>"}</button>
            <button onClick={reset} name="reset">Reset</button>            
      </div>

      <Cards products={products} />
    </div>
  );
};

export default LandingPage;
