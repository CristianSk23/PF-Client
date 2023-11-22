import React, { useState } from "react";
import styles from "./promotionPopup.module.css";

const PromotionPopup = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [currentImage, setCurrentImage] = useState(0); // para el slider, cambiar por la libreria que se use

  const closetPopup = () => {
    setShowPopup(false);
  };

  //Cambiar una vez se defina la libreria para el diseño
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };
//Cambiar una vez se defina la libreria para el diseño
  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };
  // Actualmente solo envio 3 imagenes defu=inir cuales productos se van a mostrar aqui
  const images = [
    "https://ingenieriademenu.com/wp-content/uploads/2022/05/Cuales-son-las-frutas-y-cuales-son-las-verduras.jpg",
    "https://equipment21.com/wp-content/uploads/productos-que-venden-las-tiendas-de-abarrotes.jpg",
    "https://static.eldiario.es/clip/d210311d-65b7-4359-ae7a-11bf2ef96f22_16-9-discover-aspect-ratio_default_0.jpg",
  ];

  return (
    showPopup && (
      <div className={styles.popup}>
        <div className={styles["poput-content"]}>
          <h2>50% OFF</h2>
          <div className={styles.slider}>
            <img src={images[currentImage]} alt={`Imagen ${currentImage + 1}`} />
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
          </div>
          <p>Descripcion</p>
          <button onClick={closetPopup}>Close</button>
        </div>
      </div>
    )
  );
};
export default PromotionPopup;
