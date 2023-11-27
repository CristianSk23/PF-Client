import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { filter, getProdCategories } from "../../redux/action/actions";

const NavBar = ({ onSearch, filterCond }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const prodCategories = useSelector((state) => state.prodCategories) || [];

  useEffect(() => {
    dispatch(filter(filterCond, name));
  }, [filterCond]);

  useEffect(() => {
    if (prodCategories.length === 0) {
      dispatch(getProdCategories());
    }
  }, []);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <div className="pagination justify-content-center">
        <input
          id="search"
          type="search"
          placeholder="Name product"
          className={styles.input}
          value={name}
          onChange={handleChange}
        />
        <button
          className={styles.searchButton}
          disabled={name == ""}
          onClick={() => onSearch(name)}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginLeft: "-5px" }}
          />
        </button>

        <button
          type="button"
          className="btn btn-light"
          style={{ width: "150px" }}
        >
          <Link
            to="/createProduct"
            style={{ textDecoration: "none", color: "black" }}
          >
            Create Product
          </Link>
        </button>
      </div>
    </div>
);
};

export default NavBar;