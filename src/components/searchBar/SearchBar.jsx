import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
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
    </div>


  );
};

export default SearchBar;
