import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { getProfile, getMyPosts, getBoughtItems } from "../Services/User";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import MyProductCard from "../Components/Cards/MyProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
// import { useParams } from "react-router-dom";
import "../Assets/css/userprofile.css"

function About() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [x, setX] = useState([]);
  const callAbout = async () => {
    try {
      const data = await Autho();
      setX(data);
      getProfile(data._id).then((profile) => {
        console.log(profile.data);
        setData(profile.data.result);
        if (profile.data.result.description === "") {
          setDesc("No description added");
        } else {
          setDesc(profile.data.result.description);
        }
      });
      getMyPosts().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
      // const base64string = btoa(
      //   String.fromCharCode(...new Uint8Array(data.image.data.data)).toString()
      // );
      // setImage(base64string);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = (e) => {
    const filterValue = e.target.value;
    if(filterValue === "My Posts"){
      getMyPosts().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
    }
    else if(filterValue === "Bought Posts"){
      getBoughtItems().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
    }
  }
  useEffect(() => {
    callAbout();
  }, []);

  return (
    <>
      <CommonSection title="My Profile" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <img src={data.image} alt="" className="w-100 single__nft-img" />
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="single__nft__content">
                <h2>{data.name}</h2>

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

                {/* <UserData user={userdata} /> */}
                <p className="my-4">{desc}</p>
                <button
                  className="singleNft-btn d-flex align-items-center gap-2 w-100"
                  onClick={() => {
                    navigate("/update");
                  }}
                >
                  <i class="ri-shopping-bag-line"></i>
                  <Link to="/wallet">Edit</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>My Posts</h3>
              </div>
            </Col>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="My Posts">My Posts</option>
                    <option value="Bought Posts">Bought Posts</option>
                  </select>
                </div>
              </div>
            </Col>
            {products.map((product, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <MyProductCard
                  key={product._id}
                  product={product}
                  userId={x._id}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
