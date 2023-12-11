import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showThePopup, getPromotions } from "../../redux/action/actions";
import styles from "./promotionPopup.module.css";
import { useAuth0 } from "@auth0/auth0-react";

const PromotionPopup = () => {
  const dispatch = useDispatch();

  const {isAuthenticated, isLoading} = useAuth0()
  const showPopup = useSelector((state) => state.isShowPopup);
  const [currentImage, setCurrentImage] = useState(0); // para el slider, cambiar por la libreria que se use
  const products = useSelector((state) => state.products.promotionsProducts);
  const isUser = useSelector((state) => state.isUser)
  const typeUser = useSelector((state) => state.user.typeUser)

  const closetPopup = () => {
    dispatch(showThePopup(false));
  };
  
  useEffect(() => {
     dispatch(getPromotions());
  }, []);


  return (!isLoading && (!isAuthenticated || typeUser === isUser) && (isUser === "Invited" || isUser === "User") &&
    showPopup && products?.length != 0 ) && (
      <div className={styles.popup}>
        <div className={styles["poput-content"]}>
          <div
            id="carouselExampleDark"
            className={`carousel carousel-dark slide ${styles["carousel-fade"]}`}
            data-bs-ride="carousel"
            data-bs-interval="5000"
          >
            <button
              type="button"
              className={`btn-close ${styles["close-button"]}`}
              aria-label="Close"
              onClick={closetPopup}
            ></button>
            <div className="carousel-indicators" style={{margin:"29px"}}>
              {products && products.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {products && products.map((product, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === currentImage ? "active" : ""}`}
                >
                  <img
                    src={product.image[0]}
                    className="d-block mx-auto"
                    alt={`Imagen ${index + 1}`}
                    style={{ maxWidth: "100%", height: "400px", objectFit: "cover" }}
                  />

                  <h5 style={{ fontSize: "25px", color:"black" }}>
                      <strong>{product.nameProd}</strong>
                    </h5>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    )
};

export default PromotionPopup;