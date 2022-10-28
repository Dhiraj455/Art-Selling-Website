import React, { useEffect, useState } from "react";
import { deleteItem, updateCart } from "../Services/Buy";

function CartCard(props) {
  const [deleteData, setDeleteData] = useState([]);

  useEffect(() => {
    setDeleteData({
      ...deleteData,
      id: props.product._id,
      userId: props.userId,
    });
  }, []);

  const handleAdd = () => {
    updateCart({
      id: props.product._id,
      count: props.product.count + 1,
    })
      .then((data) => {
        console.log(data.data);
        alert(data.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const handleSub = () => {
    updateCart({
      id: props.product._id,
      count: props.product.count - 1,
    })
      .then((data) => {
        console.log(data.data);
        alert(data.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

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

  console.log(props);
  return (
    <>
      <div className="card">
        <img
          src={props.product.postImage}
          className="photo card-img-top"
          alt="Some"
        />
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{props.product.title}</li>
          <li className="list-group-item">{props.product.price}</li>
          <li className="list-group-item">
            {props.product.price * props.product.count}
          </li>
          <div className="list-group-item">
            <button onClick={handleAdd}>+</button>
            <p>{props.product.count}</p>
            <button onClick={handleSub}>-</button>
          </div>
        </ul>
        <button onClick={handleBtn}>Delete</button>
      </div>
    </>
  );
}

export default CartCard;
