import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { getProductsById, cleanSingleProd, addToCart } from "../../redux/action/actions";


const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const prodById = useSelector((state) => state.singleProduct);
  const dispatch = useDispatch()
  const [productLoaded, setProductLoaded] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    image: [],
    active: false,
    tags: "None",
    stock: 0,
  });
  
  
  const handleCancel = () => {
    navigate(-1);
  };

  const handleBuy = () => {
    dispatch(addToCart(id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data
        await dispatch(getProductsById(id));
      } catch (error) {}
    };

    

    // Call fetchData

    fetchData();

    return () => {
      setProduct({
        id: "",
        name: "",
        category: "",
        brand: "",
        description: "",
        price: 0,
        discountPercentage: 0,
        image: [],
        active: false,
        tags: "None",
        stock: 0,
      });
      dispatch(cleanSingleProd());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // Access the state (prodById) after the data is fetched

    if (id && !productLoaded && prodById?.nameProd) {
      setProduct({
        name: prodById.nameProd || "",
        category: prodById.CategoryId || "",
        brand: prodById.brand || "",
        description: prodById.description || "",
        price: prodById.price || 0,
        discountPercentage: prodById.discountPercentage || 0,
        image: prodById.image || [],
        active: prodById.active.toString() || "true",
        tags: prodById.tags || "None",
        stock: prodById.stock || 0,
      });
      setProductLoaded(true);
    }
    // return setProductLoaded(false)
  }, [id, productLoaded, prodById, product]);

  return (

    <div style={{ backgroundColor: "#F8F9F9", minHeight: "100vh" }}>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="card mb-3"
          style={{ width: "1080px", marginTop: "120px" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
            {product.image.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          className="img-fluid rounded-start"
          alt={`product-${index}`}
          style={{ width: "100%", height: "230px", objectFit: "contain" }}
        />
      ))}
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text" style={{ marginTop: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>Brand:</span> {product.brand}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Category:</span> {product.category}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Description:</span> {product.description}
                </p>
                <p className="card-text">
                  <span style={{ fontWeight: "bold" }}>Stock:</span> {product.stock}
                </p>
                <h5 className="card-title">
                  <span style={{ fontWeight: "bold" }}>Price:</span> $ {product.price}
                </h5>
                <button type="button" className="btn btn-success" style={{margin:"2px"}} onClick={handleBuy}>
              🛒
              </button>
                <a
                  onClick={handleCancel}
                  className="btn btn-light"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    margin: "10px",
                    width: "120px",
                  }}
                >
                  Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;