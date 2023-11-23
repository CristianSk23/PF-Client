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

  const [aux, setAux] = useState(false)

  const handleOrderByPrice = (event) => {
      dispatch(orderPrice(event.target.value))
      setAux(true)
  }

  const handleOrderByName = (event) => {
    dispatch(orderName(event.target.value))
      setAux(true)
  }

  const handleFilterByPrice = (event) => {
    dispatch(filterPrice(event.target.value))
  }

  const handleFilterByType = (event) => {
    dispatch(filterType(event.target.value))
  }

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
    setResetSearch(true)
  } 

  return (
    <div>
      <nav className={styles.navBar}>
        
        
        <PromotionPopup />
        <SearchBar onSearch={onSearch} />

        {/*<SideBar />
        <p>Filters</p>
        <DropdownMenu /> Comento estos componentes ya que hice unos nuevos*/}

      </nav>

      <div className={styles.orderfilter}>
            <div className="select-container">
            <label className={styles.label}>FILTER BY TYPE</label>
            <select name="select" onChange={handleFilterByType}>
                <option value="">Select Type</option>
                <option value="electronics">Electronics</option>
                <option value="smart">Smart</option>
                <option value="kitchen">Kitchen</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>FILTER BY PRICE</label>
            <select name="select" onChange={handleFilterByPrice}>
              <option value="">Select Range of Price</option>
              <option value="100">less than 100</option>
              <option value="300">between 100 to 300</option>
              <option value="500">more than 300</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>ORDER BY NAME</label>
            <select name="select" onChange={handleOrderByName}>
                <option value="">Order By Name</option>
                <option value="A">Ascendant</option>
                <option value="D">Descendant</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>ORDENAR BY PRICE</label>
            <select  name="select" onChange={handleOrderByPrice}>
                <option value="">Order by Price</option>
                <option value="A">Max Price</option>
                <option value="D">Min Price</option>
            </select>
            </div>
        </div>

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
