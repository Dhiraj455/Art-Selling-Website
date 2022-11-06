import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { getProfile, getMyPosts, getBoughtItems } from "../Services/User";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import MyProductCard from "../Components/Cards/MyProductCard";
import CommonSection from "../Components/Common-section/CommonSection";
import "../Assets/css/userprofile.css";
import AddWalletPopUp from "../Components/PopUps/AddWalletPopUp";
import BoughtCard from "../Components/Cards/BoughtCard";
import Pagination from "../Components/Pagination/Pagination";
import styled from "styled-components";
import { toast } from "react-toastify";

const Page = styled.div``;

function About() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [x, setX] = useState([]);
  const [toggle, setToggle] = useState(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limit = 4;

  const pageChange = (pageNo) => {
    setPage(pageNo);
  };

  const handleSort = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "My Posts") {
      setToggle(1);
    } else if (filterValue === "Bought Posts") {
      setToggle(2);
    }
  };

  useEffect(() => {
    try {
      Autho().then((data) => {
        setX(data);
        getProfile(data._id).then((profile) => {
          setData(profile.data.result);
          if (profile.data.result.description === "") {
            setDesc("No description added");
          } else {
            setDesc(profile.data.result.description);
          }
        });
      });
      // const base64string = btoa(
      //   String.fromCharCode(...new Uint8Array(data.image.data.data)).toString()
      // );
      // setImage(base64string);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (toggle === 1) {
      getMyPosts(page, limit).then((data) => {
        setProducts(data.data.result);
        setTotalPages(data.data.totalPage);
        if (data.data.message) {
          toast.warn(data.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
    } else if (toggle === 2) {
      getBoughtItems(page, limit).then((data) => {
        setProducts(data.data.result);
        setTotalPages(data.data.result.totalPage);
        if (data.data.message) {
          toast.warn(data.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
    }
  }, [page,products, limit]);

  return (
    <>
      <CommonSection title="My Profile" />
      <section>
        <Container>
          <Row>
            <Col lg="4" md="6" sm="6">
              <img
                src={data.image}
                alt=""
                className="w-60 single__nft-img userImage"
              />
            </Col>

            <Col lg="8" md="6" sm="6">
              <div className="single__nft__content userData">
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
                <p className="my-4">Email : {data.email}</p>
                <p className="my-4">{desc}</p>
                <div className="nft__creator d-flex gap-3 align-items-center">
                  <div className="creator__img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="32"
                      height="32"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M22 7h1v10h-1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v3zm-2 10h-6a5 5 0 0 1 0-10h6V5H4v14h16v-2zm1-2V9h-7a3 3 0 0 0 0 6h7zm-7-4h3v2h-3v-2z" />
                    </svg>
                  </div>
                  <div className="creator__detail">
                    <h5>Wallet</h5>
                    <h6>{data.wallet}</h6>
                  </div>
                </div>
                <div className=" mt-3 d-flex align-items-center justify-content-between gap-4">
                  <button
                    className="singleNft-btn d-flex align-items-center gap-2 w-100"
                    onClick={() => {
                      navigate("/update");
                    }}
                  >
                    <i className="ri-pencil-line"></i>
                    <Link to="/update">Edit</Link>
                  </button>
                  <button
                    className="singleNft-btn d-flex align-items-center gap-2 w-100"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <i className="ri-wallet-3-line"></i>
                    <Link to="/profile"> Wallet</Link>
                  </button>
                </div>
                {showModal && <AddWalletPopUp setShowModal={setShowModal} />}
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
            {products &&
              products.map((product, key) => (
                <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                  {product.createdBy._id === x._id ? (
                    <MyProductCard
                      key={product._id}
                      product={product}
                      userId={x._id}
                    />
                  ) : (
                    <BoughtCard key={product._id} product={product} />
                  )}
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
    </>
  );
}

export default About;
