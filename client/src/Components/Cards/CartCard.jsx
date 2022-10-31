import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "../../Services/Buy";
import UpdateCardPopUp from "../PopUps/UpdateCardPopUp";
// import { deletePost } from "../Services/User";
import "./card.css";
// import Modal from "../Modal/Modal";

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

  // const handleAdd = () => {
  //   updateCart({
  //     id: props.product._id,
  //     count: props.product.count + 1,
  //   })
  //     .then((data) => {
  //       console.log(data.data);
  //       alert(data.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err.message);
  //     });
  // };

  // const handleSub = () => {
  //   updateCart({
  //     id: props.product._id,
  //     count: props.product.count - 1,
  //   })
  //     .then((data) => {
  //       console.log(data.data);
  //       alert(data.data.message);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert(err.message);
  //     });
  // };

  const handleBtn = () => {
    deleteItem(deleteData)
      .then((data) => {
        console.log(data.data);
        alert(data.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
    console.log(deleteData);
  };

  const handleUpdate = () => {
    setShowModal(true)
  }

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
          {/* <div className="creator__img">
            <img src={props.product.createdBy.image} alt="" className="w-100" />
          </div> */}

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            {/* <div>
              <h6>Created By</h6>
              <Link to={`/otherUser/${props.product.createdBy._id}`}>
                <p>{props.product.createdBy.name}</p>
              </Link>
            </div> */}

            <div>
              <h6>Price</h6>
              <p>Rs. {props.product.price} x {props.product.count}</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            <i class="ri-shopping-bag-line"></i> Delete
          </button>

          {showModal && <UpdateCardPopUp setShowModal={setShowModal} product={props.product} counts={props.product.count}/>}
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleUpdate}
          >
            <i class="ri-shopping-bag-line"></i> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
