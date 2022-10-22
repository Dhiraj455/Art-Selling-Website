import React, { useEffect, useState } from "react";
import { addtocart } from "../Services/Buy";

function ProductCard(props) {
  const [productData, setProductData] = useState([]);
  const [addToCart, setAddToCart] = useState([
    // {
    //   postId: "",
    //   userId: "",
    //   price: "",
    //   count: "",
    //   postImage: "",
    // },
  ]);
  useEffect(() => {
    console.log(props.product);
    setProductData(props.product);
    console.log(productData);
    setAddToCart({
      ...addToCart,
      // id: props.product._id,
      title : props.product.title,
      userId: props.userId,
      price: props.product.price,
      count: 1,
      postImage: props.product.post,
    });
  }, []);
  console.log(addToCart);
  const handleClick = () => {
    window.location.href = `/aProduct/${props.product._id}`;
  };
  const handleBtn = () => {
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
    <>
      <div className="card">
        <img
          src={props.product.post}
          className="photo card-img-top"
          alt="Some"
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li onClick={handleClick} className="list-group-item">
            {props.product.title}
          </li>
          <li className="list-group-item">{props.product.price}</li>
          <li className="list-group-item">{props.product.description}</li>
          <li className="list-group-item">{props.product.count}</li>
        </ul>
        <button onClick={handleBtn}>Add To Cart</button>
      </div>
    </>
  );
}

export default ProductCard;
