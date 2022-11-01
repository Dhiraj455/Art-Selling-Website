import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { post, getAPost } from "../Services/User";
import { useNavigate } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/create-item.css";

const ProfilePic = styled.div`
  display: flex;
  justify-content: center;
  height: 180px;
`;

const Profile = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 120px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 120px;
  border: 3px solid #001825;
  background: #001825;
  margin-bottom: 10px;
`;

const PseudoProfile = styled.div`
  display: inline-block;
  font-size: 40px;
  line-height: 48px;
  text-align: center;
  background: #418df9;
  font-weight: 600;
  color: white;
  width: 145px;
  height: 145px;
  border: 6px solid;
  border-color: #001825;
  border-radius: 50%;
  padding-top: 40px;
`;

const Post = () => {
    
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState();
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState({
    title: "",
    description: "",
    price: "",
    PromiseRejectionEvent: "",
    userId: "",
    count: "",
  });
  
  const Update = async () => {
    try {
      let x = await Autho();
      setPosts({ ...posts, userId: x._id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Update();
  }, []);

  const handlePic = (e) => {
    const fileReader = new FileReader();
    e.preventDefault();
    var pic = e.target.files[0];
    console.log(pic);
    fileReader.onload = function (e) {
      setImages(e.target.result);
      setPosts({ ...posts, pic: pic });
    };
    fileReader.readAsDataURL(pic);
  };

  const form = new FormData();
  form.append("title", posts.title);
  form.append("description", posts.description);
  form.append("price", posts.price);
  form.append("post", posts.pic);
  form.append("userId", posts.userId);
  form.append("count", posts.count);
  console.log(posts);

  const handleAdd = async (e) => {
    e.preventDefault();
    post(form).then((data) => {
      console.log(data.data);
      if (data.data.message === "Posted successfully") {
        navigate("/profile");
        alert(data.data.message);
      } else {
        alert(data.data.message);
      }
    });
  };
  

  return (
    <>
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Post Image</h5>
              {/* <NftCard item={item} /> */}
              <ProfilePic>
                <Profile>
                  {images === "" || images === undefined || images === null ? (
                    <PseudoProfile
                    dangerouslySetInnerHTML={{
                        __html: "P",
                      }}
                    />
                  ) : (
                    <ProfileImage src={images} alt="" />
                  )}
                  <input
                    ref={fileRef}
                    hidden
                    type="file"
                    p="1.5"
                    accept="image/*"
                    name="image"
                    onChange={handlePic}
                  />
                  <button
                    className="bid__btn d-flex align-items-center gap-5 pad"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <i class="ri-refresh-line"></i> Change
                  </button>
                </Profile>
              </ProfilePic>
            </Col>

            <Col lg="9" md="8" sm="6">
              <div className="create__item">
                <form>
                  {/* <div className="form__input">
                    <label htmlFor="">Upload File</label>
                    <input type="file" className="upload__input" />
                  </div> */}

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter Name"
                      onChange={(e) => setPosts({ ...posts, title: e.target.value })}
                    />
                  </div>

                  {/* <div className="form__input">
                    <label htmlFor="">Description</label>
                    <input
                      type="number"
                      placeholder="Enter Description"
                      value={user.description}
                      onChange={(e) =>
                        setUser({ ...user, description: e.target.value })
                      }
                    />
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" />
                  </div> */}

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      onChange={(e) =>
                        setPosts({ ...posts, description: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Name"
                      onChange={(e) => setPosts({ ...posts, price: e.target.value })}
                    />
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Count</label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter Name"
                      onChange={(e) => setPosts({ ...posts, count: e.target.value })}
                    />
                  </div>
                  <button
                    className="bid__btn d-flex align-items-center gap-5 pad"
                    onClick={handleAdd}
                  >
                    <i class="ri-add-line"></i> Post
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Post;
