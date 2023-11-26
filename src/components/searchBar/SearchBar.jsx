
import styles from "./searchBar.module.css";
import { filter, orderName, orderPrice } from "../../redux/action/actions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch, setFilterCond, filterCond, setAux, aux }) => {
const dispatch = useDispatch();
const [name, setName] = useState("");

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
    <div className={styles.searchBar}>
      <input
        id="search"
        type="search"
        placeholder="Name product"
        value={name}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={() => onSearch(name)}>
        Search
      </button>

      <div className={styles.orderfilter}>
            <div className="select-container">
            <label className={styles.label}>FILTER BY TYPE</label>
            <select name="type" className="select" onChange={handleOpChange} value={filterCond.type}>
                <option value="">Select Type</option>
                <option value="electronics">Electronics</option>
                <option value="smart">Smart</option>
                <option value="kitchen">Kitchen</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>FILTER BY PRICE</label>
            <select name="price" className="select" onChange={handleOpChange} value={filterCond.price}>
              <option value="">Select Range of Price</option>
              <option value="100">less than 100</option>
              <option value="300">between 100 to 300</option>
              <option value="500">more than 300</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>SORT BY NAME</label>
            <select name="select" className="select" onChange={handleOrderByName}>
                <option value="">Order By Name</option>
                <option value="A">Ascendant</option>
                <option value="D">Descendant</option>
            </select>
            </div>

            <div className="">
            <label className={styles.label}>SORT BY PRICE</label>
            <select  name="select" className="select" onChange={handleOrderByPrice}>
                <option value="">Order by Price</option>
                <option value="A">Max Price</option>
                <option value="D">Min Price</option>
            </select>
            </div>
        </div>
            
        <button className={styles.searchButton}>
        <Link to="/createProduct">Create</Link>

      </button>

    </div>
  );
};

export default SearchBar;
