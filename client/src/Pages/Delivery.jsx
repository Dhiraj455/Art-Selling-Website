import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
// import { getPost } from "../Services/User";
import { getDeliveredTrack } from "../Services/Buy";
// import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import styled from "styled-components";
import DeliveryCard from "../Components/Cards/DeliveryCard";
// import MyProductCard from "../Components/Cards/MyProductCard";

const ProfileContainer = styled.div`
  background: #001825;
  border-radius: 20px;
  border: 1px solid #083f5f;
  padding: 30px 25px;
  margin: 15px 5px;
`;

function Delivery() {
  const [products, setProducts] = useState([]);
  const [postsDetails, setPostsDetails] = useState([]);
  const [show, setShow] = useState("true");
  //   const [filter, setFilter] = useState("Delivered");
  const [x, setX] = useState([]);

  const Update = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDeliveredTrack().then((data) => {
      setProducts(data.data.result);
      console.log(data.data.result);
      if (data.data.result.length === 0) {
        setShow("false");
      }
      for (let i = 0; i < data.data.result.length; i++) {
        setPostsDetails((current) => [
          ...current,
          data.data.result[i].postsDetails,
        ]);
      }
    });
  }, []);

  useEffect(() => {
    Update();
  }, []);

  const handleBtn = () => {};

  const TrackPage = (props) => {
    return (
      <>
        {props.products.map((product, key) => (
          <>
            {x._id === product.boughtFrom ? (
              <DeliveryCard
                key={key}
                product={product}
                userId={x._id}
                id={props.id}
                isdelivered={props.delivery}
              />
            ) : null}
          </>
        ))}
      </>
    );
  };
  console.log(products.length);

  return (
    <>
      <CommonSection title="Tracking" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Track</h3>
              </div>
            </Col>
            {postsDetails.map((product, key) => (
              <>
                {show ? (
                  <ProfileContainer>
                    <Row lg="4" md="6" sm="6">
                      <TrackPage
                        products={product}
                        id={products[key]._id}
                        delivery={products[key].isDelivered}
                      />
                    </Row>
                    {products[key].isDelivered ? (
                      <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
                        <button
                          className="bid__btn d-flex align-items-center gap-1"
                          onClick={handleBtn}
                        >
                          <i class="ri-check-line"></i> Accept
                        </button>

                        {/* {showModal && <AddToCart setShowModal={setShowModal} product={props.product} userId={props.userId}/>} */}
                      </div>
                    ) : null}
                    <br />
                    <h3>
                      Total : <span>Rs. {products[key].totals}</span>
                    </h3>
                  </ProfileContainer>
                ) : null}
              </>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Delivery;
