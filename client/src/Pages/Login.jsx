import React from "react";
import { login } from "../Services/User";
import { Link } from "react-router-dom";
import "../Assets/css/signuplogin.css";
import { toast } from "react-toastify";

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
      console.log(data.data);
      if (data.data.message === "Please fill all the fields") {
        toast.warn(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (data.data.message === "Invalid Credentials") {
        toast.warn(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else if (data.data.message === "User does not exist") {
        window.location.href = "/signup";
        toast.warn(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.success(data.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        window.location.href = "/";
      }
      // console.log(user);
    });
  };

  return (
    <>
      <div class="form">
        <h3 class="title">Welcome Back! </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="72"
          height="72"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <div class="content">
          <div>
            <input
              class="input"
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <input
              class="input"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <button type="submit" class="button2" onClick={handleLogin}>
              SIGN IN
            </button>
          </div>
          <p class="aha">
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
