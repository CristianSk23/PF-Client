import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import styles from "./SideBarSelector.module.css";
//import { filterByCategory, orderByName, orderByPrice } from "./reducer";

// Simulan las funciones de las action! // MODIFICAR--
const filterByCategory = (opcion) => {
  console.log(`Estoy filtrando el objeto ${opcion}`);
};
const orderByName = () => {
  console.log(`Estoy ordenando ${opcion}`);
};
const orderByPrice = () => {
  console.log(`Estoy ordenando ${opcion}`);
};

const SideBarSelector = ({ nameButton, opcions }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();

  const toggleDesplegable = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (opcion) => {
    switch (nameButton) {
      case "Filtrar por nombre":
        console.log(nameButton);
        console.log(opcion);
        // hacer el dispatch
        filterByCategory(opcion);
        break;
      case "Ordenar por nombre":
        console.log(nameButton);
        console.log(opcion);
        // hacer el dispatch
        orderByName(opcion);
        break;
      case "Ordenar por precio":
        console.log(nameButton);
        console.log(opcion);
        // hacer el dispatch
        orderByPrice(opcion);
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.sidebar}>
      <ul className={styles.list}>
        <li>
          <button onClick={toggleDesplegable}>{nameButton}</button>
          {showDropdown && (
            <div>
              <ul>
                {opcions.map((opcion, index) => (
                  <li key={index}>
                    <button onClick={() => handleItemClick(opcion)}>
                      {opcion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SideBarSelector;
