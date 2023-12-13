import React, { useState } from "react";
import styles from "./orderDetailUserByIdPopup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/action/actions";
import { useNavigate } from "react-router-dom";
import StarRating from "../starRating/StarRating";
import { CloseButton } from "react-bootstrap";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { getOrdersByUserId } from "../../redux/action/actions";
import { toast } from "react-toastify";

const OrderDetailUserByIdPopup = ({ orderDetails, onClose, idUser }) => {
  const isUser = useSelector((state) => state.isUser);
  const user = useSelector((state) => state.user.email);
  const [reviews, setReviews] = useState([]);
  const [send, setSend] = useState(false);
  const products = orderDetails;
  const dispatch = useDispatch();

  const sendReview = async () => {
    const updatedReviews = reviews.map((review) => ({
      ...review,
      UserId: idUser.toString(),
      email: user,
      rating: review.rating?.toString() || "0",
      reviewText: review.reviewText || "",
    }));

    setReviews(updatedReviews);

    for (const updatedReview of updatedReviews) {
      await dispatch(postReview(updatedReview));
      toast.success("Review added successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // theme: "dark",
        // theme: "light",
      });
    }
    onClose();
    dispatch(getOrdersByUserId(idUser));
  };

  const existingReview = (productId) => {
    return reviews.find((review) => review.productId === productId);
  };

  const handleStarRating = (productId, rating) => {
    const existing = existingReview(productId);

    if (existing) {
      const updatedReviews = reviews.map((review) =>
        review.productId === productId ? { ...review, rating: rating } : review
      );
      setReviews(updatedReviews);
    } else {
      setReviews([...reviews, { productId: productId, rating: rating }]);
    }
  };

  const handleComment = (productId, reviewText) => {
    const existing = existingReview(productId);

    if (existing) {
      const updatedReviews = reviews.map((review) =>
        review.productId === productId
          ? { ...review, reviewText: reviewText }
          : review
      );
      setReviews(updatedReviews);
    } else {
      setReviews([
        ...reviews,
        { productId: productId, reviewText: reviewText },
      ]);
    }
  };

  return (
    <div>
      {isUser === "Admin" ? (
        <div>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <CloseButton onClick={onClose} className={styles.closeButton} />
            <table className="table table-hover" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th className={styles.th} scope="col">
                    Id product
                  </th>
                  <th className={styles.th} scope="col">
                    Name product
                  </th>
                  <th className={styles.th} scope="col">
                    Price product
                  </th>
                  <th className={styles.th} scope="col">
                    Price on sale
                  </th>
                  <th className={styles.th} scope="col">
                    Stock
                  </th>
                  <th className={styles.th} scope="col">
                    Quantity
                  </th>
                  <th className={styles.th} scope="col">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderDetails) &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className={styles.td}>{product?.id}</td>
                      <td className={styles.td}>{product?.nameProd}</td>
                      <td className={styles.td}>
                        ${parseFloat(product?.price).toFixed(2)}
                      </td>
                      <td className={styles.td}>
                        $
                        {parseFloat(product?.priceOnSale) > 0
                          ? parseFloat(product?.priceOnSale).toFixed(2)
                          : parseFloat(product?.price).toFixed(2)}
                      </td>
                      <td className={styles.td}>{product?.stock}</td>
                      <td className={styles.td}>{product?.quantityProd}</td>
                      <td className={styles.td}>{product?.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <CloseButton onClick={onClose} className={styles.closeButton} />
            <table className="table table-hover" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th className={styles.th} scope="col">
                    Quantity
                  </th>
                  <th className={styles.th} scope="col">
                    Image
                  </th>
                  <th className={styles.th} scope="col">
                    Name product
                  </th>
                  <th className={styles.th} scope="col">
                    Price product
                  </th>
                  <th className={styles.th} scope="col">
                    Price on sale
                  </th>
                  <th className={styles.th} scope="col">
                    Category
                  </th>
                  <th className={styles.th} scope="col">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderDetails) &&
                  orderDetails.map((product) => (
                    <React.Fragment key={product.id}>
                      <tr>
                        <td className={styles.td}>{product?.quantityProd}</td>
                        <td className={styles.td}>
                          <img
                            src={product?.image[0]}
                            alt=""
                            style={{ height: "50px" }}
                          />
                        </td>
                        <td className={styles.td}>{product?.nameProd}</td>
                        <td className={styles.td}>
                          ${parseFloat(product?.price).toFixed(2)}
                        </td>
                        <td className={styles.td}>
                        $
                        {parseFloat(product?.priceOnSale) > 0
                          ? parseFloat(product?.priceOnSale).toFixed(2)
                          : parseFloat(product?.price).toFixed(2)}
                      </td>
                        <td className={styles.td}>{product?.category}</td>
                        <td className={styles.td}>
                          {product?.reviews
                            .filter((review) => review.idUser == idUser)
                            .map((review) => (
                              <div key={review.id}>
                                <StarRating
                                  selectedStars={parseInt(review?.rating) || 0}
                                  onSelectStar={null}
                                  isSelect={false}
                                />
                                <p>{review.comment}</p>
                              </div>
                            ))}
                          {product?.reviews.filter(
                            (review) => review.idUser == idUser
                          ).length === 0 && (
                            <div>
                              <StarRating
                                selectedStars={
                                  existingReview(product.id)?.rating || 0
                                }
                                onSelectStar={(rating) =>
                                  handleStarRating(
                                    product.id,
                                    rating,
                                    setSend(true)
                                  )
                                }
                                isSelect={true}
                              />
                              <input
                                type="text"
                                value={
                                  existingReview(product.id)?.reviewText || ""
                                }
                                onChange={(e) =>
                                  handleComment(product.id, e.target.value)
                                }
                              />
                            </div>
                          )}
                        </td>
                        <td className={styles.td}></td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            {send && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={sendReview}
                style={{ marginTop: "5px" }}
              >
                Send review
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailUserByIdPopup;
