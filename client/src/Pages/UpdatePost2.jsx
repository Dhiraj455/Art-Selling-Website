import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Autho from "../Helpers/AuthHelp";
import { updatePost, getAPost } from "../Services/User";
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
  border-radius: 60px;
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

function UpdatePost() {
    const fileRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [images, setImages] = useState();
    const [userId,setUserId] = useState();
    const [update, setUpdate] = useState({
        id: "",
        title: "",
        description: "",
        oldPost: "",
        pic: "",
        price: "",
        count: "",
    });
    console.log(update);
    const Update = async () => {
        try {
            const x = await Autho();
            setUserId(x._id)
            console.log(x);
            getAPost(id).then((data) => {
                setUpdate({
                    ...update,
                    id: id,
                    title: data.data.result.title,
                    description: data.data.result.description,
                    oldPost: data.data.result.post,
                    price: data.data.result.price,
                    count: data.data.result.count,
                })
                setImages(data.data.result.post);
            })
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
            setUpdate({ ...update, pic: pic });
        };
        fileReader.readAsDataURL(pic);
    };

    const form2 = new FormData();
    form2.set("id", update.id)
    form2.set("title", update.title);
    form2.set("description", update.description);
    form2.set("oldPost", update.oldPost);
    form2.set("pic", update.pic);
    form2.set("price", update.price);
    form2.set("count", update.count);
    form2.set("userId",userId);

    const handleUpdate = async (e) => {
        e.preventDefault();
        updatePost(form2).then((data) => {
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
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                aria-describedby="emailHelp"
                                name="title"
                                value={update.title}
                                onChange={(e) => setUpdate({ ...update, name: e.target.value })}
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
                                value={update.description}
                                onChange={(e) =>
                                    setUpdate({ ...update, description: e.target.value })
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">
                                Price
                            </label>
                            <textarea
                                name="price"
                                type="number"
                                className="form-control"
                                id="desc"
                                rows="3"
                                value={update.price}
                                onChange={(e) =>
                                    setUpdate({ ...update, price: e.target.value })
                                }
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">
                                Count
                            </label>
                            <textarea
                                name="count"
                                className="form-control"
                                type="number"
                                id="desc"
                                rows="3"
                                value={update.count}
                                onChange={(e) =>
                                    setUpdate({ ...update, count: e.target.value })
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

export default UpdatePost;
