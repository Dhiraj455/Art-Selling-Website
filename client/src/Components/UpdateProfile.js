import React from "react";
import { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";


function UpdateProfile() {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const Update = async () => {
    try{
        const x = await Autho();
        console.log(x);
        const {name, description,email} = x;
        setUserName(name);
        setUserDescription(description);
        setUserEmail(email);
    }
    catch(err){
        console.log(err);
    }
  }
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
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = userName;
    const description = userDescription;
    const email = userEmail;
    const user = await fetch("/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, email }),
    });
    const data = await user.json();
    console.log(data);
    if (data.message === "User updated successfully") {
      window.location.href = "/about";
    }
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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
            value={userDescription}
            onChange={(e) => setUserDescription(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </>
  );
}

export default UpdateProfile;
