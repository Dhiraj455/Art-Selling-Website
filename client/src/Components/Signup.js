import React from "react";
// import axios from "axios";

function Signup() {
  // const cloud_name = "miniprojectsem5";
  // const cloud_apikey = "511684939184442"
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  // const [pic, setPic] = React.useState("");
  

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
    const { name, email, password, cpassword, pic } = user;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password,cpassword,pic }),
    });

    const data = await response.json();
    console.log(data);
    if (data.message === "Please fill all the fields") {
      console.log("if");
      alert(data.message);
    }
    else if(data.message === "User already exists"){
      console.log("else if");
      alert(data.message);
    }
    else if(password !== cpassword) {
        alert("Password does not match");
        return;
      }
    else {
      console.log("else");
      alert(data.message);
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div className="App">
        <h3>Signup</h3>
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
            {/* <input type="file" p="1.5" accept="image/*" name="pic" onChange={(e) => {
              postdetails(e.target.files[0])
            }} /> */}
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

export default Signup;
