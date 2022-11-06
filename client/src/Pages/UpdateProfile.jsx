import React, { useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { update } from "../Services/User";
import { useNavigate } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import styled from "styled-components";
import "../Assets/css/create-item.css";
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

const UpdateProfile = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();
  const [images, setImages] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    oldImage: "",
    pic: "",
  });

  useEffect(() => {
    try {
      Autho().then((data) => {
        const { name, description, email, image } = data;
        setUser({
          ...user,
          name: name,
          description: description,
          email: email,
          oldImage: image,
        });
        setImages(image);
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
      setUser({ ...user, pic: pic });
    };
    fileReader.readAsDataURL(pic);
  };

  const form2 = new FormData();
  form2.set("name", user.name);
  form2.set("description", user.description);
  form2.set("email", user.email);
  form2.set("oldImage", user.oldImage);
  form2.set("pic", user.pic);

  const handleUpdate = async (e) => {
    e.preventDefault();
    update(form2).then((data) => {
      toast.success(data.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/profile");
    });
  };
  return (
    <>
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
                        __html: user.name.split("")[0],
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
                  <br />
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

                  <div className="form__input">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form__input">
                    <label htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100"
                      value={user.description}
                      onChange={(e) =>
                        setUser({ ...user, description: e.target.value })
                      }
                    ></textarea>
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
    </>
  );
};

export default UpdateProfile;
