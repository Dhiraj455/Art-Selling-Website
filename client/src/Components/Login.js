import React from "react";
import { login } from "../Services/User"
// import axios from "axios";

function Login() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    login(user).then((data) => {
      // const data = await response.json();
      console.log(data.data);
      if (data.data.message === "Please fill all the fields") {
        alert(data.data.message);
      } else if (data.data.message === "Invalid Credentials") {
        alert(data.data.message);
      } else if (data.data.message === "User does not exist") {
        window.location.href = "/signup";
        alert(data.data.message);
      } else {
        // dispatch({type:"USER",payload:true});
        alert(data.data.message);
        window.location.href = "/";
      }
      // console.log(user);
    })
    // const response = await fetch("/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });   
  };

  return (
    <>
      <div className="App">
        <h3>Login</h3>
        <form method="POST">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
