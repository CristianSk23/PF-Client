import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, changePage, orderPrice, filterType, filterPrice, orderName } from "../../redux/action/actions";
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

  const [filterCond, setFilterCond] = useState({type:'all', price:'all', order:'ascendent'})
  const [aux, setAux] = useState(false)

  const pagination = (event) => {
    dispatch(changePage(event.target.name))
  }

  const [resetSearch, setResetSearch] = useState(false);

  const reset = (event) => {
    dispatch(getAllProducts(event.target.name))
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
    select.value = "";
    })
  } 

  return (
    <div>
      <nav className={styles.navBar}>
        
        <PromotionPopup />
        <SearchBar onSearch={onSearch} setFilterCond={setFilterCond} filterCond={filterCond} setAux={setAux} aux={aux} />

        {/*<SideBar />
        <p>Filters</p>
        <DropdownMenu /> Comento estos componentes ya que hice unos nuevos*/}

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
