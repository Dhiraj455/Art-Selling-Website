import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";
import AddToCart from "../PopUps/AddToCart";

const ProductCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleBtn = () => {
    setShowModal(true)
  };
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={props.product.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/aProduct/${props.product._id}`}>
            {props.product.title}
          </Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={props.product.createdBy.image} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              {props.product.createdBy._id === props.userId ? (
                <Link to={`/profile`}>
                  <p>{props.product.createdBy.name}</p>
                </Link>
              ) : (
                <Link to={`/otherUser/${props.product.createdBy._id}`}>
                  <p>{props.product.createdBy.name}</p>
                </Link>
              )}
            </div>

            <div>
              <h6>Price</h6>
              <p>Rs. {props.product.price}</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            <i className="ri-shopping-cart-line"></i> Add To Cart
          </button>

          {showModal && <AddToCart setShowModal={setShowModal} product={props.product} userId={props.userId}/>}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;
