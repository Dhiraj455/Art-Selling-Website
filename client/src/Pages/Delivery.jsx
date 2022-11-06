import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getDeliveredTrack } from "../Services/Buy";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import styled from "styled-components";
import DeliveryCard from "../Components/Cards/DeliveryCard";

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
  const [x, setX] = useState([]);

  useEffect(() => {
    try {
      Autho().then((user) => {
        setX(user);
      });
    } catch (err) {
      console.log(err);
    }
    getDeliveredTrack().then((data) => {
      setProducts(data.data.result);
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

  const TrackPage = (props) => {
    return (
      <>
        {props.products.map((product, key) => (
          <div key={key}>
            {x._id === product.boughtFrom ? (
              <DeliveryCard
                key={key}
                product={product}
                userId={x._id}
                id={props.id}
                isdelivered={props.delivery}
              />
            ) : null}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <CommonSection title="Deliveries" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Delivery</h3>
              </div>
            </Col>
            {postsDetails.map((product, key) => (
              <div key={key}>
                {show ? (
                  <ProfileContainer>
                    <Row lg="4" md="8" sm="8">
                      <TrackPage
                        products={product}
                        id={products[key]._id}
                        delivery={products[key].isDelivered}
                      />
                    </Row>
                    <br />
                    <h3>
                      Total : <span>Rs. {products[key].totals}</span>
                    </h3>
                  </ProfileContainer>
                ) : null}
              </div>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Delivery;
