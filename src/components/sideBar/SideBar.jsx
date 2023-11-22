import React, { useState } from "react";
import SideBarSelector from "../sideBarSelector/SideBarSelector";
import styles from "./sideBar.module.css";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //Lista de objetos a mostrar se puede llenar con los objetos que tengamos
  
  const object = [
    // falta que se tomen solo las categorias que existen y si se agrega una nueva la actualice aqui
    { name: "Filter by category",opcions: ["Abarrotes", "Lacteos", "Limpieza"] },
    { name: "Sort by name", opcions: ["Upward", "Falling"] },
    { name: "Sort by price", opcions: ["Minor", "Elderly"] },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`${styles.container} ${isSidebarOpen ? "" : styles.sidebarClosed}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>☰</button>
      {isSidebarOpen && (
        <div>
          {object.map((item, index) => (
            <SideBarSelector
              key={index}
              nameButton={item.name}
              opcions={item.opcions}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;
