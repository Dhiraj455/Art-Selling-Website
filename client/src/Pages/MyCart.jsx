import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { mycart, buyCart } from "../Services/Buy";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../Components/Common-section/CommonSection";
import CartCard from "../Components/Cards/CartCard";

function MyCart() {
  // const [buy, setBuy] = useState({
  //   totals: 0,
  //   postsDetails: [],
  // });
  const [postsDetails, setPostsDetails] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const [count, setCount] = useState([]);
  const [x, setX] = useState([]);
  const User = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user);
      mycart(user._id)
        .then((data) => {
          console.log(data.data.result);
          setData(data.data.result);
          for (let i = 0; i < data.data.result.length; i++) {
            setPostsDetails((postsDetails) => [
              ...postsDetails,
              data.data.result[i].postBy,
            ]);
            setCount((counts) => [...counts, data.data.result[i].count]);
            // setBoughtFrom((current) => [
            //   ...current,
            //   data.data.result[i].postBy.createdBy,
            // ]);
          }
          setTotal(data.data.total);
          console.log(postsDetails);
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
    // console.log(boughtFrom);
    buyCart({
      totals: total,
      postsDetails: postsDetails,
      userId: x._id,
      count: count,
      // boughtFrom: boughtFrom,
    })
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
              <Col lg="3" md="4" sm="6" className="mb-4">
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
