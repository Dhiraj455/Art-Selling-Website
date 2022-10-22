import React, { useEffect, useState } from "react";

function ProductCard(props) {
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    console.log(props.product)
    setProductData(props.product)
    console.log(productData);
  },[]);
  const handleClick = () => {
    window.location.href = `/aProduct/${props.product._id}`;
  }
  return (
    <>
      <div className="card">
        <img src={props.product.post} className="photo card-img-top" alt="Some" />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li onClick={handleClick} className="list-group-item">{props.product.title}</li>
          <li className="list-group-item">{props.product.price}</li>
          <li className="list-group-item">{props.product.description}</li>
          <li className="list-group-item">{props.product.count}</li>
        </ul>
      </div>
    </>
  );
}

export default ProductCard;
