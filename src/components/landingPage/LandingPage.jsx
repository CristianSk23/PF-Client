import React, { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  changePage,
  getProductsByName,
} from "../../redux/action/actions";
import NavBar from "../navBar/NavBar";
import FilterAndOrder from "../filterAndOrder/FilterAndOrder";
import PromotionPopup from "../promotionPopup/PromotionPopup";
import Cards from "../cards/Cards";
import styles from "./landingPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "react-bootstrap";
import Footer from "../Footer/Footer";
import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import image5 from "../../assets/image5.png";

import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.data);
  const isUser = useSelector((state) => state.isUser)
  const [isLoging, setIsLoging] = useState(false)
  const [shouldRenderPromotionPopup, setShouldRenderPromotionPopup] = useState(false);
  const {isAuthenticated, loginWithRedirect, AuthenticationError} = useAuth0()

  const onSearch = (name) => {
    dispatch(getProductsByName(name));
  };

  useEffect(() => {
    if (isUser === "Admin") {
      setShouldRenderPromotionPopup(false);
    } else {
      setShouldRenderPromotionPopup(true);
    }
  }, [isUser]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    const errorDescription = urlParams.get("error_description");

    if (error && errorDescription) {
      toast.warn(`Please verify your email and Try to Login Again`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const [filterCond, setFilterCond] = useState({
    type: "all",
    price: "all",
    order: "ascendent",
  });
  const [aux, setAux] = useState(false);

  const pagination = (event) => {
    dispatch(changePage(event.target.name));
  };

  const reset = (event) => {
    dispatch(getAllProducts());
    const selectElements = document.querySelectorAll("select");
    selectElements.forEach((select) => {
      select.value = "all";
    });
  };

  return (
    <div className={styles.container}>
      {shouldRenderPromotionPopup && <PromotionPopup />}


{shouldRenderPromotionPopup && <PromotionPopup />}

<Carousel style={{ marginTop: "55px" }}>
        <Carousel.Item>
        <img
            className="d-block w-100"

            src={image1}
            alt="Second slide"
            style={{ maxWidth: "100%", height: "100%", objectFit: "fill" }}

          />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"

            style={{ maxWidth: "100%", height: "100%", objectFit: "fill" }}

          />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"

            src={image3}
            alt="Second slide"
            style={{ maxWidth: "100%", height: "100%", objectFit: "fill" }}

          />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"

            src={image4}
            alt="Second slide"
            style={{ maxWidth: "100%", height: "100%", objectFit: "fill" }}

          />
        </Carousel.Item>
        <Carousel.Item>
        <img
            className="d-block w-100"

            src={image5}
            alt="Second slide"
            style={{ maxWidth: "100%", height: "100%", objectFit: "fill" }}

          />
        </Carousel.Item>
      </Carousel>

      <NavBar
        onSearch={onSearch}
        setFilterCond={setFilterCond}
        filterCond={filterCond}
        setAux={setAux}
        aux={aux}
      />

      <FilterAndOrder
        setFilterCond={setFilterCond}
        filterCond={filterCond}
        setAux={setAux}
      />

      <div className="pagination justify-content-center">
        <button
          type="button"
          className="form-control"
          style={{
            width: "50px",
            textAlign: "center",
            marginTop: "5px",
            height: "37.6px",
          }}
          onClick={reset}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>

      <Cards products={products} />

      <nav aria-label="Page navigation example" style={{ marginTop: "22px" }}>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="prev"
              style={{ cursor: "default" }}
            >
              {"<<"} Previous
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link"
              onClick={pagination}
              name="next"
              style={{ cursor: "default" }}
            >
              Next {">>"}
            </a>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default LandingPage;
