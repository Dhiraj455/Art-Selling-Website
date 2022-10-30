import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { getAPost } from "../Services/User";
import { Link } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/singlepost.css";

function SinglePost() {
  const [product, setProduct] = useState([]);
  const [userdata,setUserdata] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    try {
      let x = Autho();
      console.log(x);
      getAPost(id).then((data) => {
        setProduct(data.data.result);
        setUserdata(data.data.result.createdBy)
        console.log(data.data.result);
      });
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const UserData = (props) => {
    return (
      <div className="nft__creator d-flex gap-3 align-items-center">
        <div className="creator__img">
          <img src={props.user.image} alt="" className="w-100" />
        </div>
        <div className="creator__detail">
          <p>Created By</p>
          <h6>{props.user.name}</h6>
        </div>
      </div>
    );
  };
  
  return (
    <>
      <CommonSection title={product.title} />

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img
                src={product.post}
                alt=""
                className="w-100 single__nft-img"
              />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{product.title}</h2>

                <div className=" d-flex align-items-center justify-content-between mt-4 mb-4">
                  <div className=" d-flex align-items-center gap-4 single__nft-seen">
                    <span>
                      <i class="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i class="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i class="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i class="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>

                <UserData user={userdata} />
                <p className="my-4">{product.description}</p>
                <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                  <i class="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Add To Cart</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <LiveAuction /> */}
    </>
  );
}

export default SinglePost;