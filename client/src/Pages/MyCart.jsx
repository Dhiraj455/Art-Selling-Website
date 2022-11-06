import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { mycart, buyCart } from "../Services/Buy";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../Components/Common-section/CommonSection";
import CartCard from "../Components/Cards/CartCard";
import { toast } from "react-toastify";

function MyCart() {
  const [postsDetails, setPostsDetails] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [count, setCount] = useState([]);
  const [price, setPrice] = useState([]);
  const [x, setX] = useState([]);

  const handleBuy = () => {
    buyCart({
      totals: total,
      postsDetails: postsDetails,
      userId: x._id,
      count: count,
      price: price,
    })
      .then((data) => {
        toast.warn(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.warn(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  useEffect(() => {
    try {
      Autho().then((user) => {
        setX(user);
        mycart(user._id)
          .then((data) => {
            setData(data.data.result);
            for (let i = 0; i < data.data.result.length; i++) {
              setPostsDetails((postsDetails) => [
                ...postsDetails,
                data.data.result[i].postBy,
              ]);
              setCount((counts) => [...counts, data.data.result[i].count]);
              setPrice((price) => [...price, data.data.result[i].price]);
            }
            setTotal(data.data.total);
          })
          .catch((err) => {
            console.log("Error" + err);
          });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <CommonSection title="My Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Cart</h3>
              </div>
            </Col>
            {data.map((products, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                <CartCard product={products} userId={x._id} />
              </Col>
            ))}
            <h1>Total {total}</h1>
            <button
              className="bid__btn align-items-center gap-1"
              onClick={() => {
                handleBuy();
              }}
            >
              Buy
            </button>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default MyCart;
