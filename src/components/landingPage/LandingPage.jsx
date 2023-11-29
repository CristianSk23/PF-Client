import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, changePage, orderPrice, filterType, filterPrice, orderName, getProductsByName } from "../../redux/action/actions";
import SideBar from "../sideBar/SideBar";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import SearchBar from "../searchBar/SearchBar";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
//auth0
import LogginButton from "../loggin/Loggin";
import LogoutButton from "../logout/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);

  //verfico la existencia de una sesión
  const { user, isAuthenticated } = useAuth0()

  const onSearch = (name) => {
    console.log("estoy entrando aqui");
    console.log(name);
    dispatch(getProductsByName(name))
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
    dispatch(getAllProducts())
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
    select.value = "all";
    })
    setResetSearch(true)
  } 

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        
        
        <PromotionPopup />
        <SearchBar onSearch={onSearch} setFilterCond={setFilterCond} filterCond={filterCond} setAux={setAux} aux={aux} />

        {/*Componentes de login - logout de authentificacion */}
        {!user && !isAuthenticated && <LogginButton/>}
        {user && isAuthenticated && <LogoutButton/>}
        {user && isAuthenticated && <Link to="/profile"><button>Mi cuenta</button></Link>}

        {/*<SideBar />
        <p>Filters</p>
        <DropdownMenu /> Comento estos componentes ya que hice unos nuevos*/}

      </nav>

      <div className="pagination justify-content-center" style={{marginTop:"15px"}}>
        <button type="button" className="btn btn-light" style={{ width: '200px', textAlign:"center", margin:"5px", borderRadius:"20px" }} onClick={reset}>
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
