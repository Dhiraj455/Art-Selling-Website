import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getPost } from "../Services/User";
import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import MyProductCard from "../Components/Cards/MyProductCard";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [x, setX] = useState([]);
  const Update = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
      getPost().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(x);
  useEffect(() => {
    Update();
  }, []);

  return (
    <>
      <CommonSection title="Market Place" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Market</h3>
                {/* <span>
                <Link to="/market">Explore more</Link>
              </span> */}
              </div>
            </Col>

            {products.map((product, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                {product.createdBy._id === x._id ? (
                  <MyProductCard key={key} product={product} userId={x._id} />
                ) : (
                  <ProductCard key={key} product={product} userId={x._id} />
                )}
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AllProducts;
