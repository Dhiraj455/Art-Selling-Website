import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { deletePost, getAPost } from "../Services/User";
import { Link } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/singlepost.css";

function SinglePost() {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [deletePosts, setDeletePosts] = useState([]);
  const [x, setX] = useState([]);
  const { id } = useParams();

  const handleDelete = () => {
    try {
      deletePost(deletePosts).then((data) => {
        console.log(data.data);
        alert(data.data.message);
        navigate("/profile");
      });
    } catch (err) {
      console.log("Error" + err);
    }
  };

  const handleUpdate = () => {
    navigate(`/updatePost/${product._id}`);
  };

  useEffect(() => {
    try {
      Autho().then((user) => {
        setX(user);
        getAPost(id).then((data) => {
          setProduct(data.data.result);
          setUserdata(data.data.result.createdBy);
          setDeletePosts({
            ...deletePosts,
            id: data.data.result._id,
            userId: user._id,
          });
        });
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const UserData = (props) => {
    return (
      <>
        <div className="nft__creator d-flex gap-3 align-items-center">
          <div className="creator__img">
            <img src={props.user.image} alt="" className="w-100" />
          </div>
          <div className="creator__detail">
            <h5>Created By</h5>
            {props.user._id === x._id ? (
              <Link to={`/profile`}>
                <h6>{props.user.name}</h6>
              </Link>
            ) : (
              <Link to={`/otherUser/${props.user._id}`}>
                <h6>{props.user.name}</h6>
              </Link>
            )}
          </div>
        </div>
      </>
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

                <UserData user={userdata} />
                <p className="my-4">{product.description}</p>
                {userdata._id !== x._id ? (
                  <button className="singleNft-btn d-flex align-items-center gap-2 w-100">
                    <i className="ri-shopping-bag-line"></i>
                    <Link to="/">Add To Cart</Link>
                  </button>
                ) : (
                  <>
                    <div className=" mt-3 d-flex align-items-center gap-3">
                      <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={handleDelete}
                      >
                        <i className="ri-delete-bin-6-line"></i> Delete
                      </button>

                      <button
                        className="bid__btn d-flex align-items-center gap-1"
                        onClick={handleUpdate}
                      >
                        <i className="ri-refresh-line"></i> Update
                      </button>
                    </div>
                  </>
                )}
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
