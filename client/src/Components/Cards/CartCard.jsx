import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem } from "../../Services/Buy";
import UpdateCardPopUp from "../PopUps/UpdateCardPopUp";
import "./card.css";

const CartCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState([]);

  useEffect(() => {
    setDeleteData({
      ...deleteData,
      id: props.product._id,
      userId: props.userId,
    });
  }, []);

  const handleBtn = () => {
    deleteItem(deleteData)
      .then((data) => {
        toast.warn(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.reload();
      })
      .catch((err) => {
        toast.warn(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const handleUpdate = () => {
    setShowModal(true);
  };

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={props.product.postImage} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/aProduct/${props.product._id}`}>
            {props.product.title}
          </Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Price</h6>
              <p>
                Rs. {props.product.price} x {props.product.count}
              </p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between gap-1">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            <i className="ri-delete-bin-6-line"></i> Delete
          </button>

          {showModal && (
            <UpdateCardPopUp
              setShowModal={setShowModal}
              product={props.product}
              counts={props.product.count}
            />
          )}
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleUpdate}
          >
            <i className="ri-refresh-line"></i> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
