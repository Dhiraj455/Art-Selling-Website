import React from "react";
import { suspend } from "../../Services/Admin";
// import { isNotDelivered } from "../../Services/Buy";

import "./card.css";

const UsersCard = (props) => {
  const handleBtn = () => {
    suspend({ id: props.user._id }).then((data) => {
        alert(data.data.message);
        window.location.reload();
    })
    // isNotDelivered({
    //   id: props.id,
    //   postId: props.product._id,
    // }).then((data) => {
    //   alert(data.data.message);
    //   window.location.reload();
    // });
  };

  return (
    <div className="single__nft__card m-2">
      <div className="nft__img">
        <img src={props.user.image} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">{props.user.name}</h5>
        <div className="creator__info w-100 d-flex align-items-center justify-content-between">
          <div>
            <h6>Email</h6>
            <p>{props.user.email}</p>
          </div>
        </div>
        <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
          {!props.user.isSuspended ? (
            <button
              className="bid__btn d-flex align-items-center gap-1"
              onClick={handleBtn}
            >
              Suspend
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
