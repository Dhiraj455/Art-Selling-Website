import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { getAPost } from "../Services/User";

function SinglePost() {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    try {
      let x = Autho();
      console.log(x);
      getAPost(id).then((data) => {
        setProduct(data.data.result);
        console.log(data.data.result);
      });
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <h1>Hello Single Post</h1>
      <div className="container">
        <div className="card">
          <img src={product.post} className="photo card-img-top" alt="Some" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{product.title}</li>
            <li className="list-group-item">{product.price}</li>
            <li className="list-group-item">{product.description}</li>
            <li className="list-group-item">{product.count}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SinglePost;
