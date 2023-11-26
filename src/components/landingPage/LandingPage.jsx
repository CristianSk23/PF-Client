import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, changePage, orderPrice, filterType, filterPrice, orderName, getProductsByName } from "../../redux/action/actions";
import SideBar from "../sideBar/SideBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SearchBar from "../searchBar/SearchBar";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);

  const onSearch = (name) => {
    console.log("estoy entrando aqui");
    console.log(name);
    dispatch(getProductsByName(name))
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
    <div className={styles.container}>
      <nav className={styles.navBar}>
        
        
        <PromotionPopup />
        <SearchBar onSearch={onSearch} />

        {/*<SideBar />
        <p>Filters</p>
        <DropdownMenu /> Comento estos componentes ya que hice unos nuevos*/}

      </nav>
        <div className="pagination justify-content-center" style={{marginTop: "15px"}}>
          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleFilterByType}>
            <option value="" disabled selected hidden>Filter by Type</option>
            <option value="electronics">Electronics</option>
            <option value="smart">Smart</option>
            <option value="kitchen">Kitchen</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", justifyContent: "center", margin:"5px" }} onChange={handleFilterByPrice}>
            <option value="" disabled selected hidden>Filter by Price</option>
            <option value="100">Less than 100</option>
            <option value="300">Between 100 to 300</option>
            <option value="500">More than 300</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByName}>
            <option value="" disabled selected hidden>Order By Name</option>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByPrice}>
            <option value="" disabled selected hidden>Order by Price</option>
            <option value="A">Max Price</option>
            <option value="D">Min Price</option>
          </select>

          <button type="button" className="btn btn-light" style={{ width: '200px', textAlign:"center", margin:"5px" }} onClick={reset}>
            Reset Fiters
          </button>
        </div>

      <Cards products={products} />

      <nav aria-label="Page navigation example" style={{marginTop:"22px"}}>
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" onClick={pagination} name="prev" style={{cursor: "default"}}>{"<<"} Previous</a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={pagination} name="next" style={{cursor: "default"}}>Next {">>"}</a>
            </li>
          </ul>
      </nav>
    </div>

    //A FUTURO AGREGAR UN FOOTER
  );
};

export default LandingPage;
