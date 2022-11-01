import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { addtocart } from "../../Services/Buy";
// import { deletePost } from "../Services/User";
import { isDelivered } from "../../Services/Buy";
import "./card.css";
// import Modal from "../PopUps/Modal";
// import AddToCart from "../PopUps/AddToCart";

const DeliveryCard = (props) => {
  //   const [showModal, setShowModal] = useState(false);
  // const [addToCart, setAddToCart] = useState([]);
  //   const [deletePosts, setDeletePosts] = useState([]);
  const [Delivereds, setDelivered] = useState(false);

  useEffect(() => {
    console.log(props.product);
    setDelivered(props.product.isDelivered);
  }, []);

  // console.log(addToCart);
  const handleBtn = () => {
    isDelivered({
      id: props.id,
      postId: props.product._id,
    }).then((data) => {
      alert(data.data.message);
      window.location.reload();
    });
    //   setShowModal(true)
    //   try {
    //     addtocart(addToCart).then((data) => {
    //       console.log(data.data);
    //       alert(data.data.message);
    //     });
    //   } catch (err) {
    //     console.log("Error" + err);
    //   }
  };
  return (
    // <section></section>
    <div className="single__nft__card m-2">
      <div className="nft__img">
        <img src={props.product.postId.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          {/* <Link to={`/aProduct/${props.product._id}`}>
            {props.product.title}
        </Link> */}
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
        {/* 
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
        </div> */}

        <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            {Delivereds ? (
              <i class="ri-check-line">Delivered</i>
            ) : (
              <i class="ri-check-line">Deliver</i>
            )}
          </button>

          {/* {showModal && <AddToCart setShowModal={setShowModal} product={props.product} userId={props.userId}/>} */}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;
