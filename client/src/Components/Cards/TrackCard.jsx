import React from "react";
import "./card.css";

const TrackCard = (props) => {
  return (
    <div className="single__nft__card m-2">
      <div className="nft__img">
        <img src={props.product.postId.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          {props.product.postId.title}
        </h5>
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Price</h6>
            <p>
              {props.product.postId.price} x {props.product.count}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
