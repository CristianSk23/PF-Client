import { useState } from "react";
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
    </div>
  );
};

export default SearchBar;
