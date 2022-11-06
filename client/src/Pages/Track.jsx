import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getTrack, isAccepted } from "../Services/Buy";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import styled from "styled-components";
import TrackBox from "../Components/TrackBox/TrackBox";
import { toast } from "react-toastify";

const ProfileContainer = styled.div`
  background: #001825;
  border-radius: 20px;
  border: 1px solid #083f5f;
  padding: 30px 25px;
  margin: 15px 5px;
`;

function Track() {
  const [products, setProducts] = useState([]);
  const [postsDetails, setPostsDetails] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    try {
      Autho().then((user) => {
        setX(user);
      });
    } catch (err) {
      console.log(err);
    }
    getTrack().then((data) => {
      setProducts(data.data.result);
      for (let i = 0; i < data.data.result.length; i++) {
        setPostsDetails((current) => [
          ...current,
          data.data.result[i].postsDetails,
        ]);
      }
    });
  }, []);

  const handleBtn = (id) => {
    console.log(id);
    isAccepted({ id: id }).then((data) => {
      toast.success(data.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      window.location.reload();
    });
  };

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
              <ProfileContainer key={key}>
                <Row lg="4" md="8" sm="8">
                  <TrackBox
                    products={product}
                    id={products[key]._id}
                    delivery={products[key].isDelivered}
                    userId={x._id}
                    postsDetails={postsDetails[key]}
                  />
                </Row>
                {products[key].isDelivered ? (
                  <div className=" mt-3 d-flex align-items-center justify-content-between gap-2">
                    <button
                      className="bid__btn d-flex align-items-center gap-1"
                      onClick={() => {
                        handleBtn(products[key]._id);
                      }}
                    >
                      <i className="ri-check-line"></i> Accept
                    </button>
                  </div>
                ) : null}
                <br />
                <h3>
                  Total : <span>Rs. {products[key].totals}</span>
                </h3>
              </ProfileContainer>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Track;
