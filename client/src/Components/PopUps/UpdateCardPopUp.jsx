import React, { useEffect } from "react";
import { useState } from "react";
import Autho from "../../Helpers/AuthHelp";
import { updateCart } from "../../Services/Buy";
import "../../Assets/css/modal.css";
// import "./modal.css"

const UpdateCardPopUp = ({ setShowModal, product, counts }) => {
  const [count, setCount] = useState(0);
  const callAbout = async () => {
    try {
      await Autho();
      setCount(counts);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callAbout();
  }, []);

  const handleBtn = () => {
    console.log(count);
    try {
      updateCart({ id: product._id, count: count }).then((data) => {
        alert(data.data.message);
        setShowModal(false);
        window.location.reload();
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
        <h6 className="text-center text-light">Update Cart</h6>

        <div className="input__item mb-3">
          <h6>Enter Quantity, {product.postBy.count} available</h6>
          <input
            type="number"
            placeholder="Enter quantity"
            value={count}
            onChange={(e) => {
              setCount(e.target.value);
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
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateCardPopUp;
