import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { mycart, buyCart } from "../Services/Buy";
import CartCard from "../Components/CartCard";

function MyCart() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [x, setX] = useState([]);
  const User = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
      mycart(user._id)
        .then((data) => {
          console.log(data.data.result);
          setData(data.data.result);
          setTotal(data.data.total);
        })
        .catch((err) => {
          console.log("Error" + err);
        });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleBuy = () => {
    buyCart({ userId: x._id })
      .then((data) => {
        console.log(data.data);
        alert(data.data.message);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  useEffect(() => {
    User();
  }, [data]);

  return (
    <>
      <div className="container">
        {data.map((products, key) => (
          <CartCard product={products} userId={x._id} />
        ))}
      </div>
      <h1>Total {total}</h1>
      <button onClick={handleBuy}>Buy</button>
    </>
  );
}

export default MyCart;
