import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getPost } from "../Services/User";
import ProductCard from "../Components/ProductCard";

function AllProducts() {
  const [products, setProducts] = useState([]);
  // const [del,setDel] = useState([
  //   {
  //     id:"",
  //     userId:""
  //   }
  // ]);

  const Update = async () => {
    try {
      let x = await Autho();
      console.log(x._id);
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
      {products.map((product) => (
        <div className="container">
          <ProductCard product={product} userId={product.createdBy}/>
          <br/>
          <br/>
        </div>
      ))}
    </>
  );
}

export default AllProducts;
