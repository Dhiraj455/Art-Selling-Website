import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
// import { getPost } from "../Services/User";
import { getTrack } from "../Services/Buy";
// import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import styled from "styled-components";
import TrackCard from "../Components/Cards/TrackCard";
// import MyProductCard from "../Components/Cards/MyProductCard";

const ProfileContainer = styled.div`
  background: #001825;
  border-radius: 20px;
  border: 1px solid #083f5f;
  padding: 15px;
  margin: 30px 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

function Track() {
  const [products, setProducts] = useState([]);
  const [postsDetails, setPostsDetails] = useState([]);
  const [filter, setFilter] = useState("Not Accepted");
  const [totals, setTotals] = useState(0);
  const [x, setX] = useState([]);

  const Update = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
      getTrack({ filter: filter }).then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
        for (let i = 0; i < data.data.result.length; i++) {
          setPostsDetails((current) => [
            ...current,
            data.data.result[i].postsDetails,
          ]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const TrackPage = (props) => {
    return (
      <>
        {props.products.map((product, key) => (
          <TrackCard key={key} product={product} userId={x._id} />
        ))}
        {/* <h3>{totals}</h3> */}
      </>
    );
  };
  console.log(postsDetails);
  useEffect(() => {
    Update();
  }, []);

  return (
    <>
      <CommonSection title="Tracking" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Track</h3>
                {/* <span>
                <Link to="/market">Explore more</Link>
              </span> */}
              </div>
            </Col>
            {/* {products.map((data) => (
              <h3>{data.totals}</h3>
            ))} */}
            {postsDetails.map((product, key) => (
              // {product.postsDetails.map(())}
              <Col lg="3" md="4" sm="6" className="mb-4">
                {/* <ProfileContainer> */}
                  <TrackPage products={product} />
                  <h3>Total Amount : {products[key].totals}</h3>
                  {/* <TrackCard key={key} product={product} userId={x._id} /> */}
                {/* </ProfileContainer> */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Track;
