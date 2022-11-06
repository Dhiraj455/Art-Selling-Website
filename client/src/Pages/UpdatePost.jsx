import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { updatePost, getAPost } from "../Services/User";
import { useNavigate } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import styled from "styled-components";
import { Container, Row, Col } from "reactstrap";
import "../Assets/css/create-item.css";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { toast } from "react-toastify";

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

const UpdatePost = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState();
  const [userId, setUserId] = useState();
  const [update, setUpdate] = useState({
    id: "",
    title: "",
    description: "",
    oldPost: "",
    pic: "",
    price: "",
    count: "",
  });

  useEffect(() => {
    try {
      Autho().then((data) => {
        setUserId(data._id);
      });
      getAPost(id).then((data) => {
        setUpdate({
          ...update,
          id: id,
          title: data.data.result.title,
          description: data.data.result.description,
          oldPost: data.data.result.post,
          price: data.data.result.price,
          count: data.data.result.count,
        });
        setImages(data.data.result.post);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handlePic = (e) => {
    const fileReader = new FileReader();
    e.preventDefault();
    var pic = e.target.files[0];
    fileReader.onload = function (e) {
      setImages(e.target.result);
      setUpdate({ ...update, pic: pic });
    };
    fileReader.readAsDataURL(pic);
  };

  const form2 = new FormData();
  form2.set("id", update.id);
  form2.set("title", update.title);
  form2.set("description", update.description);
  form2.set("oldPost", update.oldPost);
  form2.set("pic", update.pic);
  form2.set("price", update.price);
  form2.set("count", update.count);
  form2.set("userId", userId);

  const handleUpdate = async (e) => {
    e.preventDefault();
    updatePost(form2).then((data) => {
      toast.success(data.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/profile");
    });
  };
  return (
    <>
    <Header />
      <CommonSection title="Create Item" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="4" sm="6">
              <h5 className="mb-4 text-light">Preview Item</h5>
              <ProfilePic>
                <Profile>
                  {images === "" || images === undefined || images === null ? (
                    <PseudoProfile
                      dangerouslySetInnerHTML={{
                        __html: update.title.split("")[0],
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
                    <i className="ri-refresh-line"></i> Change
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
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={update.title}
                      onChange={(e) =>
                        setUpdate({ ...update, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      value={update.description}
                      onChange={(e) =>
                        setUpdate({ ...update, description: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Price</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter Name"
                      value={update.price}
                      onChange={(e) =>
                        setUpdate({ ...update, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="form__input">
                    <label htmlFor="">Count</label>
                    <input
                      type="number"
                      name="count"
                      placeholder="Enter Name"
                      value={update.count}
                      onChange={(e) =>
                        setUpdate({ ...update, count: e.target.value })
                      }
                    />
                  </div>
                  <button
                    className="bid__btn d-flex align-items-center gap-5 pad"
                    onClick={handleUpdate}
                  >
                    <i className="ri-pencil-fill"></i> Update
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default UpdatePost;
