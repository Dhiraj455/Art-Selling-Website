import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { addtocart } from "../../Services/Buy";
// import { deletePost } from "../Services/User";
import "./card.css";
import Modal from "../Modal/Modal";

const ProductCard = (props) => {

  const [showModal, setShowModal] = useState(false);
  const [addToCart, setAddToCart] = useState([]);
  const [deletePosts, setDeletePosts] = useState([]);

  useEffect(() => {
    console.log(props.product);
    setDeletePosts({
      ...deletePosts,
      id: props.product._id,
      userId: props.userId,
    });
    setAddToCart({
      ...addToCart,
      id: props.product._id,
      title: props.product.title,
      userId: props.userId,
      price: props.product.price,
      count: 1,
      postImage: props.product.post,
    });
  }, []);

  console.log(addToCart);
  const handleBtn = () => {
    // setShowModal(true)
    try {
      addtocart(addToCart).then((data) => {
        console.log(data.data);
        alert(data.data.message);
      });
    } catch (err) {
      console.log("Error" + err);
    }
  };
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={props.product.post} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title">
          <Link to={`/aProduct/${props.product._id}`}>{props.product.title}</Link>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <img src={props.product.createdBy.image} alt="" className="w-100" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <Link to={`/otherUser/${props.product.createdBy._id}`}><p>{props.product.createdBy.name}</p></Link>
            </div>

            <div>
              <h6>Price</h6>
              <p>Rs. {props.product.price}</p>
            </div>
          </div>
        </div>

        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleBtn}
          >
            <i class="ri-shopping-cart-line"></i> Add To Cart
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            <Link to="#">View History</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
