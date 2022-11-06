import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import HeroSection from "../Components/HeroSection/HeroSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ProductCard from "../Components/Cards/ProductCard";
import { getSomePosts } from "../Services/User";
import { getSomeUser } from "../Services/Admin";
import MyProductCard from "../Components/Cards/MyProductCard";
import "../Assets/css/s.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [x, setX] = useState([]);

  useEffect(() => {
    Autho().then((data) => {
      setX(data);
    });
    try {
      getSomePosts().then((data) => {
        setProducts(data.data.result);
      });
      getSomeUser().then((data) => {
        setUsers(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <HeroSection />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Users Art</h3>
                <span>
                  <Link to="/market">Explore more</Link>
                </span>
              </div>
            </Col>

            {products &&
              products.map((product, key) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={product._id}>
                  {product.createdBy._id === x._id ? (
                    <MyProductCard
                      key={product._id}
                      product={product}
                      userId={x._id}
                    />
                  ) : (
                    <ProductCard
                      key={product._id}
                      product={product}
                      userId={x._id}
                    />
                  )}
                </Col>
              ))}
            {!products ? <h2>No Products</h2> : null}
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="seller__section-title">
                <h3>Top Seller</h3>
              </div>
            </Col>
            {users &&
              users.map((user, key) => (
                <Col
                  lg="3"
                  md="6"
                  sm="12"
                  xs="8"
                  key={user._id}
                  className="mb-4"
                >
                  <div className="single__seller-card d-flex align-items-center gap-1">
                    <div className="seller__img">
                      <img src={user.image} alt="" className="w-100" />
                    </div>

                    <div className="seller__content">
                      {x._id === user._id ? (
                        <Link to={`/profile`}>
                          <p>{user.name}</p>
                        </Link>
                      ) : (
                        <Link to={`/otherUser/${user._id}`}>
                          <p>{user.name}</p>
                        </Link>
                      )}
                      <p>{user.email}</p>
                    </div>
                  </div>
                </Col>
              ))}
            {!users ? <h2>No users</h2> : null}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Home;
