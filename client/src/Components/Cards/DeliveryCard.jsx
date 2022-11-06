import React, { useState, useEffect } from "react";
import { isDelivered } from "../../Services/Buy";
import { toast } from "react-toastify";
import "./card.css";

const DeliveryCard = (props) => {
  const [Delivereds, setDelivered] = useState(false);

  useEffect(() => {
    setDelivered(props.product.isDelivered);
  }, []);

  const handleBtn = () => {
    isDelivered({
      id: props.id,
      postId: props.product._id,
    }).then((data) => {
      toast.success(data.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
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
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            {Delivereds ? (
              <span className="dp"> Delivered</span>
            ) : (
              <span className="dp"> Deliver</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
