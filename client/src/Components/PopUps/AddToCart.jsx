import React, { useEffect } from "react";
import { useState } from "react";
import Autho from "../../Helpers/AuthHelp";
import { addtocart } from "../../Services/Buy";
import "../../Assets/css/modal.css";
// import "./modal.css"

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
      addtocart(addToCart).then((data) => {
        alert(data.data.message);
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
          <i class="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Add To Cart</h6>

        <div className="input__item mb-3">
          <h6>Enter Quantity, {product.count} available</h6>
          <input
            type="number"
            placeholder="Enter quantity"
            onChange={(e) => {
              setAddToCart({ ...addToCart, count: e.target.value });
            }}
          />
        </div>

        {/* <div className="input__item mb-4">
          <input type="number" placeholder="Enter Count" />
        </div> */}

        {/* <div className="input__item mb-4">
          <input type="number" placeholder="Enter Amount" />
        </div> */}

        <button className="place__bid-btn" onClick={handleBtn}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
