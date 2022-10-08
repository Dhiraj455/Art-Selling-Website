import React from "react";
import { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import { update } from "../Services/User";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    description: "",
    oldImage:"",
    pic: "",
  });
  console.log(user);
  const Update = async () => {
    try {
      const x = await Autho();
      console.log(x);
      const { name, description, email, image } = x;
      setUser({...user, name:name, description:description, email:email, oldImage:image });
    } catch (err) {
      console.log(err);
    }
  };

  //   const Update = async () => {
  //     try {
  //       const response = await fetch("/auth", {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       });
  //       const data = await response.json();
  //       console.log(data);
  //       setUserName(data.name);
  //       setUserDescription(data.description);
  //       setUserEmail(data.email);
  //       if (data.message === "Unauthorized") {
  //         const error = new Error(data.message);
  //         throw error;
  //       }
  //     } catch (err) {
  //       window.location.href = "/login";
  //       console.log(err);
  //     }
  //   };

  useEffect(() => {
    Update();
  },[]);

  const handlePic = (e) => {
    e.preventDefault();
    var pic = e.target.files[0];
    console.log(pic);
    setUser({ ...user, pic: pic });
    console.log(pic.name);
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
      console.log(data);
      navigate("/about");
      if (data.message === "User updated successfully") {
        window.location.href = "/about";
      }
    });
    // const name = userName;
    // const description = userDescription;
    // const email = userEmail;
    // const image = userImage;
    // const user = await fetch("/update", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, description, email, image }),
    // });
    // const data = await user.json();
    // console.log(data);
    // if (data.message === "User updated successfully") {
    //   window.location.href = "/about";
    // }
  };

  return (
    <>
      <form method="POST">
        <div className="mb-3">
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
            onChange={(e) => setUser({...user,name: e.target.value})}
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
            onChange={(e) => setUser({...user,description: e.target.value})}
          ></textarea>
        </div>
        <input
          type="file"
          p="1.5"
          accept="image/*"
          name="image"
          onChange={handlePic}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateProfile;
