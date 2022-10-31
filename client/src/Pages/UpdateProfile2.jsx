import React, { useRef } from "react";
import { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { update } from "../Services/User";
import { useNavigate } from "react-router-dom";
import CommonSection from "../Components/Common-section/CommonSection";
import styled from "styled-components";

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

const ProfileContainer = styled.div`
  background: #001825;
  border-radius: 20px;
  border: 1px solid #083f5f;
  padding: 15px;
  margin: 30px 5px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

function UpdateProfile() {
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
  console.log(user);
  const Update = async () => {
    try {
      const x = await Autho();
      console.log(x);
      const { name, description, email, image } = x;
      setUser({
        ...user,
        name: name,
        description: description,
        email: email,
        oldImage: image,
      });
      setImages(image);
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
      alert(data.data.message)
      navigate("/profile")
    });
  };

  return (
    <>
      <CommonSection title="Update Profile" />
      <section>
        <ProfileContainer>
          <div className="container">
            <div className="mb-3">
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
                  <button
                    className="bid__btn d-flex align-items-center gap-1 pad"
                    onClick={() => {
                      fileRef.current.click();
                    }}
                  >
                    <i class="ri-shopping-bag-line"></i> Delete
                  </button>
                </Profile>
              </ProfilePic>
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                aria-describedby="emailHelp"
                name="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="desc" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="desc"
                rows="3"
                value={user.description}
                onChange={(e) =>
                  setUser({ ...user, description: e.target.value })
                }
              ></textarea>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </ProfileContainer>
      </section>
    </>
  );
}

export default UpdateProfile;
