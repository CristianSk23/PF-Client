import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/action/actions";
import SideBar from "../sideBar/SideBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SearchBar from "../searchBar/SearchBar";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  const onSearch = (id) => {
    console.log(id);
    // Falta implementar la busqueda atravez del id, logica en el reducer
  };

  // obtengo los productos
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <nav className={styles.navBar}>
        <SideBar />
        <p>Filters</p>
        <PromotionPopup />
        <SearchBar onSearch={onSearch} />
        <DropdownMenu />
      </nav>
      <Cards products={products} />
    </div>
  );
};

export default LandingPage;
