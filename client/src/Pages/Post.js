import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { post } from "../Services/User";
import CommonSection from "../Components/Common-section/CommonSection";

function Post() {
  //   const navigate = useNavigate();

  const [posts, setPosts] = useState({
    title: "",
    description: "",
    price: "",
    postImage: "",
    userId: "",
    count :"",
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

  const handlePost = (e) => {
    e.preventDefault();
    var pic = e.target.files[0];
    setPosts({ ...posts, postImage: pic });
    console.log(pic.name);
  };
  const form = new FormData();
  form.append("title", posts.title);
  form.append("description", posts.description);
  form.append("price", posts.price);
  form.append("post", posts.postImage);
  form.append("userId",posts.userId);
  form.append("count",posts.count);
  console.log(posts);

  const handleAdd = async (e) => {
    e.preventDefault();
    post(form).then((data) => {
      console.log(data.data);
      if (data.data.message === "Posted successfully") {
        window.location.href = "/about";
        alert(data.data.message);
      } else {
        alert(data.data.message);
      }
    });
  };

  return (
    <>
    <CommonSection title="Post" />
      <form method="POST">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="title"
            // value={user.name}
            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Price
          </label>
          <input
            type="text"
            className="form-control"
            id="price"
            aria-describedby="emailHelp"
            name="price"
            // value={user.name}
            onChange={(e) => setPosts({ ...posts, price: e.target.value })}
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
            // value={user.description}
            onChange={(e) =>
              setPosts({ ...posts, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="count" className="form-label">
            Count
          </label>
          <input
            type="number"
            className="form-control"
            id="count"
            aria-describedby="emailHelp"
            name="count"
            // value={user.name}
            onChange={(e) => setPosts({ ...posts, count: e.target.value })}
          />
        </div>
        <input
          type="file"
          p="1.5"
          accept="image/*"
          name="post"
          onChange={handlePost}
        />
        <button className="btn btn-primary" type="submit" onClick={handleAdd}>
          Add
        </button>
      </form>
    </>
  );
}

export default Post;
