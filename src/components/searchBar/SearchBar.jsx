import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [id, setId] = useState("");

  const handleChange = (event) => {
    setId(event.target.value);
  };

  return (
    <div>
      <input
        className={styles.search}
        id="search"
        type="search"
        placeholder="Name product"
        value={id}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={() => onSearch(id)}>
        Search
      </button>
      <button className={styles.searchButton}>
        <Link to="/createProduct">Create</Link>
      </button>
    </div>
  );
};

export default SearchBar;
