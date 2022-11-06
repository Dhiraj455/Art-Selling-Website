import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeletePopUp from "../PopUps/DeletePopUp";
import "./card.css";

const AdminProductCard = (props) => {
  console.log(props);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__nft__card m-2">
      <div className="nft__img">
        <img src={props.posts.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">{props.posts.title}</h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={props.posts.createdBy.image} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              {props.posts.createdBy._id === props.userId ? (
                <Link to={`/profile`}>
                  <p>{props.posts.createdBy.name}</p>
                </Link>
              ) : (
                <Link to={`/otherUser/${props.posts.createdBy._id}`}>
                  <p>{props.posts.createdBy.name}</p>
                </Link>
              )}
            </div>

            <div>
              <h6>Price</h6>
              <p>Rs. {props.posts.price}</p>
            </div>
          </div>
        </div>
        <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {showModal && (
        <DeletePopUp
          setShowModal={setShowModal}
          postName={props.posts.title}
          id={props.posts._id}
          userId={props.posts.createdBy}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
