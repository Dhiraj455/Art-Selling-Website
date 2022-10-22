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
  const [x,setX] = useState([]);
  const Update = async () => {
    try {
      let user = await Autho();
      setX(user)
      console.log(user._id);
      getPost().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(x);
  useEffect(() => {
    Update();
  }, []);

  return (
    <>
      <h1>Hello</h1>
      {products.map((product,key) => (
        <div className="container">
          <ProductCard key={key} product={product} userId={x._id}/>
          <br/>
          <br/>
        </div>
      ))}
    </>
  );
}

export default AllProducts;
