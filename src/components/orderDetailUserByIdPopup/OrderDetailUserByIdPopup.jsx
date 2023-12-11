import React, { useState } from "react";
import styles from "./orderDetailUserByIdPopup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../redux/action/actions";
import { useNavigate } from "react-router-dom";
import StarRating from "../starRating/StarRating";

const OrderDetailUserByIdPopup = ({ orderDetails, onClose, idUser }) => {
  const isUser = useSelector((state) => state.isUser);
  const user = useSelector((state) => state.user.email);
  const [reviews, setReviews] = useState([]);
  const products = orderDetails;
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const sendReview = () => {
    const updatedReviews = reviews.map((review) => ({
      ...review,
      UserId: idUser,
      email: user,
      rating: review.rating?.toString() || "0",
      reviewText: review.reviewText || "",
    }));

    setReviews(updatedReviews);
    console.log("Sending review for product:", updatedReviews);

    updatedReviews.forEach((updatedReview) => {
      dispatch(postReview(updatedReview));
    });

    onClose();
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
            <table className="table table-hover">
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
                        ${parseFloat(product?.priceOnSale).toFixed(2)}
                      </td>
                      <td className={styles.td}>{product?.stock}</td>
                      <td className={styles.td}>{product?.quantityProd}</td>
                      <td className={styles.td}>{product?.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.overlay}></div>
          <div className={styles.popup}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className={styles.th} scope="col">
                    Product code
                  </th>
                  <th className={styles.th} scope="col">
                    Quantity
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
                  <th className={styles.th} scope="col">
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orderDetails) &&
                  orderDetails.map((product) => (
                    <React.Fragment key={product.id}>
                      <tr>
                        <td className={styles.td}>{product?.id}</td>
                        <td className={styles.td}>{product?.quantityProd}</td>
                        <td className={styles.td}>{product?.nameProd}</td>
                        <td className={styles.td}>
                          ${parseFloat(product?.price).toFixed(2)}
                        </td>
                        <td className={styles.td}>
                          ${parseFloat(product?.priceOnSale).toFixed(2)}
                        </td>
                        <td className={styles.td}>{product?.category}</td>
                        <td className={styles.td}>
                          <StarRating
                            selectedStars={
                              existingReview(product.id)?.rating || 0
                            }
                            onSelectStar={(rating) =>
                              handleStarRating(product.id, rating)
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={existingReview(product.id)?.reviewText || ""}
                            onChange={(e) =>
                              handleComment(product.id, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
            <button onClick={onClose}>Close</button>
            <button onClick={sendReview}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailUserByIdPopup;
