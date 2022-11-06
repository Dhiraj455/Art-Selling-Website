import React, { useState } from "react";
import { suspend } from "../../Services/Admin";
import SuspendPopUp from "../PopUps/SuspendPopUp";
// import { isNotDelivered } from "../../Services/Buy";

import "./card.css";

const UsersCard = (props) => {
  const [showModal, setShowModal] = useState(false);
  const handleBtn = () => {
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
        {showModal && <SuspendPopUp setShowModal={setShowModal} userName={props.user.name} userId={props.user._id} />}
      </div>
    </div>
  );
};

export default UsersCard;
