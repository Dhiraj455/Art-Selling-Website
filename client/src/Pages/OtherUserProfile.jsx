import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { getProfile, getUsersPosts } from "../Services/User";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import ProductCard from "../Components/Cards/ProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import Pagination from "../Components/Pagination/Pagination";
import styled from "styled-components";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Page = styled.div``;

function About() {
  let { id } = useParams();
  const [x, setX] = useState();
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limit = 12;

  const pageChange = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    Autho().then((user) => {
      setX(user);
    });
    getProfile(id).then((profile) => {
      setData(profile.data.result);
      if (profile.data.result.description === "") {
        setDesc("No description added");
      } else {
        setDesc(profile.data.result.description);
      }
    });
  }, []);

  useEffect(() => {
    try {
      getUsersPosts(id, page, limit).then((data) => {
        setProducts(data.data.result);
        setTotalPages(data.data.totalPage);
      });
    } catch (err) {
      console.log(err);
    }
  }, [page, limit, id]);

  return (
    <>
      <Header />
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
                      <i className="ri-eye-line"></i> 234
                    </span>
                    <span>
                      <i className="ri-heart-line"></i> 123
                    </span>
                  </div>

                  <div className=" d-flex align-items-center gap-2 single__nft-more">
                    <span>
                      <i className="ri-send-plane-line"></i>
                    </span>
                    <span>
                      <i className="ri-more-2-line"></i>
                    </span>
                  </div>
                </div>
                <p className="my-4">{data.email}</p>
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
              </div>
            </Col>

            {products &&
              products.map((product, key) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                </Col>
              ))}
            <Page>
              <Pagination
                pageChange={pageChange}
                totalPages={totalPages}
                page={page}
              />
            </Page>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default About;
