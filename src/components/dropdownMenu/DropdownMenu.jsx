import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./dropdownMenu.module.css";

const DropdownMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleMenu}>Menu</button>
      {isMenuOpen && (
        <div className={styles.dropdownContent}>
          <Link to="/opcion-1">Login</Link>
          <Link to="/opcion-2">Register</Link>
          <Link to="/opcion-3">My account</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
