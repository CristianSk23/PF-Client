import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { filter, orderName, orderPrice } from "../../redux/action/actions";


const SearchBar = ({ onSearch, setFilterCond, filterCond, setAux, aux }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(filter(filterCond,name))
  },[filterCond])

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleOpChange = async (event) => {
    event.target.name === "type" && setFilterCond({...filterCond, type: event.target.value});
    event.target.name === "price" && setFilterCond({...filterCond, price: event.target.value});
  }

  const handleOrderByPrice = (event) => {
    dispatch(orderPrice(event.target.value))
    setAux(true)
}

const handleOrderByName = (event) => {
  dispatch(orderName(event.target.value))
  setAux(true)
}

  return (
    <div >
      <input
        id="search"
        type="search"
        placeholder="Name product"
        value={name}
        onChange={handleChange}/>
        <button className={styles.searchButton} onClick={() => onSearch(name)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>

      <button type="button" className="btn btn-light" style={{marginLeft: "535px"}}>
        <Link to="/createProduct" style={{textDecoration:"none", color: "black"}}>Create</Link>  
      </button>

      <div className="pagination justify-content-center" style={{marginTop: "15px"}}>
          <select name="type" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOpChange}>
            <option value="" disabled selected hidden>Filter by Type</option>
            <option value="electronics">Electronics</option>
            <option value="smart">Smart</option>
            <option value="kitchen">Kitchen</option>
          </select>

          <select name="price" className="form-control" style={{ width: '200px', textAlign:"center", justifyContent: "center", margin:"5px" }} onChange={handleOpChange}>
            <option value="" disabled selected hidden>Filter by Price</option>
            <option value="100">Less than 100</option>
            <option value="300">Between 100 to 300</option>
            <option value="500">More than 300</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByName}>
            <option value="" disabled selected hidden>Sort By Name</option>
            <option value="A">Ascendant</option>
            <option value="D">Descendant</option>
          </select>

          <select name="select" className="form-control" style={{ width: '200px', textAlign:"center", margin:"5px" }} onChange={handleOrderByPrice}>
            <option value="" disabled selected hidden>Sort by Price</option>
            <option value="A">Max Price</option>
            <option value="D">Min Price</option>
          </select>

          
        </div>
    </div>


  );
};

export default SearchBar;
