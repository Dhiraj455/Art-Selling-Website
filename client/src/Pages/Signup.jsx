import React from "react";
import { register } from "../Services/User";
// import axios from "axios";

function Signup() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    // pic: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    console.log(user);
    var name = e.target.name;
    var value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // const handlePic = (e) => {
  //   e.preventDefault();
  //   console.log(user);
  //   var pic = e.target.files[0];
  //   console.log(pic);
  //   setUser({
  //     ...user,
  //     pic: pic,
  //   });
  //   console.log(pic.name);
  // };

  // const form = new FormData();
  // form.append("pic", user.pic || user.pic.name);
  // form.set("pic", user.pic);
  // form.set("name", user.name);
  // form.set("email", user.email);
  // form.set("password", user.password);
  // form.set("cpassword", user.cpassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { password, cpassword } = user;

    register(user).then((data) => {
      console.log(data.data);
      if (data.data.message === "Please fill all the fields") {
        console.log("if");
        alert(data.data.message);
      } else if (data.data.message === "User already exists") {
        console.log("else if");
        alert(data.data.message);
      } else if (password !== cpassword) {
        alert("Password does not match");
        return;
      } else {
        console.log("else");
        alert(data.data.message);
        window.location.href = "/login";
      }
    });
  };

  return (
    <>
      <div className="App">
        <h3>Signup</h3>
        <form method="POST" onSubmit={handleLogin}>
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
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
              name="email"
              value={user.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              onChange={handleChange}
              name="cpassword"
              value={user.cpassword}
            />
            {/* <input
              type="file"
              p="1.5"
              accept="image/*"
              name="pic"
              onChange={handlePic}
            /> */}
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
