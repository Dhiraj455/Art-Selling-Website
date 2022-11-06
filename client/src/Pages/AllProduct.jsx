import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getPost } from "../Services/User";
import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/allProduct.css";
import MyProductCard from "../Components/Cards/MyProductCard";
import Pagination from "../Components/Pagination/Pagination";
import styled from "styled-components";

const Page = styled.div``;

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [x, setX] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limit = 4;
  const pageChange = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    try {
      Autho().then((data) => {
        setX(data);
      });
      getPost(page,limit).then((data) => {
        setProducts(data.data.result);
        setTotalPages(data.data.totalPage);
      });
    } catch (err) {
      console.log(err);
    }
  }, [page, limit, totalPages, products]);

  return (
    <>
      <CommonSection title="Market Place" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Market</h3>
              </div>
            </Col>

            {products && products.map((product, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                {product.createdBy._id === x._id ? (
                  <MyProductCard key={key} product={product} userId={x._id} />
                ) : (
                  <ProductCard key={key} product={product} userId={x._id} />
                )}
              </Col>
            ))}
            <Col lg="12">
            <Page>
              <Pagination
                pageChange={pageChange}
                totalPages={totalPages}
                page={page}
              />
            </Page>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AllProducts;
