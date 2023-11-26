import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input
        className={styles.search}
        id="search"
        type="search"
        placeholder="Name product"
        value={name}
        onChange={handleChange}
      />
      <button className={styles.searchButton} onClick={() => onSearch(name)}>
        Search
      </button>
      <button className={styles.searchButton}>
        <Link to="/createProduct">Create</Link>
      </button>
    </div>
  );
};

export default SearchBar;
