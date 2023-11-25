import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearch }) => {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <input
        id="search"
        type="search"
        placeholder="Search for a product..."
        value={id}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={() => onSearch(id)}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>

      <button type="button" className="btn btn-light" style={{marginLeft: "535px"}}>
        <Link to="/createProduct" style={{textDecoration:"none", color: "black"}}>Create</Link>  
      </button>
    </div>


  );
};

export default SearchBar;
