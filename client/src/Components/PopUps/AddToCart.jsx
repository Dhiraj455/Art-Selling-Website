import React, { useEffect } from "react";
import { useState } from "react";
import Autho from "../../Helpers/AuthHelp";
import { addtocart } from "../../Services/Buy";
import "../../Assets/css/modal.css";
import { toast } from "react-toastify";

const AddToCart = ({ setShowModal, product, userId }) => {
  const [addToCart, setAddToCart] = useState([]);

  const callAbout = async () => {
    try {
      await Autho();
      setAddToCart({
        ...addToCart,
        id: product._id,
        title: product.title,
        userId: userId,
        price: product.price,
        count: 1,
        postImage: product.post,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAbout();
  }, []);

  const handleBtn = () => {
    try {
      addtocart(addToCart)
        .then((data) => {
          toast.success(data.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setShowModal(false);
        })
        .catch((err) => {
          console.log(err)
          toast.warn(err.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setShowModal(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Add To Cart</h6>
        <div className="input__item mb-3">
          <h6>Enter Quantity, {product.count} available</h6>
          <input
            type="number"
            placeholder="Enter quantity"
            value={addToCart.count}
            onChange={(e) => {
              if (e.target.value <= 0) {
                setAddToCart({ ...addToCart, count: 1 });
                toast.warn("Value Cannot Be Less Than Zero", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              } else if (e.target.value > product.count) {
                setAddToCart({ ...addToCart, count: product.count });
                toast.warn("Count is more than available", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              } else if (
                !(e.target.value > product.count) &&
                !(e.target.value < 0)
              ) {
                setAddToCart({ ...addToCart, count: e.target.value });
              }
            }}
          />
        </div>

        <button className="place__bid-btn" onClick={handleBtn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
