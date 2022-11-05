import React from "react";
import { isNotDelivered } from "../../Services/Buy";
import "./card.css";

const TrackCard = (props) => {
  const handleBtn = () => {
    isNotDelivered({
      id: props.id,
      postId: props.product._id,
    }).then((data) => {
      alert(data.data.message);
      window.location.reload();
    });
  };
  
  return (
    <div className="single__nft__card m-2">
      <div className="nft__img">
        <img src={props.product.postId.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">{props.product.postId.title}</h5>
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Price</h6>
            <p>
              {props.product.postId.price} x {props.product.count}
            </p>
          </div>
        </div>
        <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
          {props.isdelivered ? (
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={handleBtn}
            >
              <i class="ri-check-line">Decline</i>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
