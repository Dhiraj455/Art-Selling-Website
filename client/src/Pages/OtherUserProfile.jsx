import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
// import "./s.css";
import { getProfile, getUsersPosts } from "../Services/User";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
// import ProductCard from "./ProductCard5";
// import MyProductCard from "../Components/MyProductCard/MyProductCard";
import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
// import { useParams } from "react-router-dom";

function About(res) {
  let { id } = useParams();
  const [x,setX] = useState();
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([]);
  // const [image, setImage] = useState("");

  const callAbout = async () => {
    try {
      const user = await Autho();
      setX(user)
      // console.log(data);
      getProfile(id).then((profile) => {
        console.log(profile.data);
        setData(profile.data.result);
        if (profile.data.result.description === "") {
          setDesc("No description added");
        } else {
          setDesc(profile.data.result.description);
        }
      });
      getUsersPosts(id).then((data) => {
        console.log(data.data.result);
        setProducts(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAbout();
  }, []);

  return (
    <>
      <CommonSection title="Users Profile" />
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
                <p className="my-4">{data.email}</p>
                {/* <UserData user={userdata} /> */}
                <p className="my-4">{desc}</p>
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
                <h3>Users Posts</h3>
                {/* <span>
                <Link to="/market">Explore more</Link>
              </span> */}
              </div>
            </Col>

            {products.map((product, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <ProductCard
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
