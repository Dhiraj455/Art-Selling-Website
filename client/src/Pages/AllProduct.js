import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getPost } from "../Services/User";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const Update = async () => {
    try {
      let x = await Autho();
      console.log(x);
      getPost().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(products);
  useEffect(() => {
    Update();
  }, []);
  return (
    <>
      <h1>Hello</h1>
      {products.map((products) => (
        <div className="card">
          <img src={products.post} className="photo card-img-top" alt="Some" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{products.title}</li>
            <li className="list-group-item">{products.price}</li>
            <li className="list-group-item">{products.description}</li>
            <li className="list-group-item">
              <a href="/update">Edit</a>
            </li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default AllProducts;
