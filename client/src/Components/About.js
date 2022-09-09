import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import "./s.css";

function About(res) {
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  
  const callAbout = async () => {
    try {
      const data = await Autho();
      setData(data);
      if (data.description === "") {
        setDesc("No description added");
      } else {
        setDesc(data.description);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAbout();
  }, []);

  return (
    <>
      <div className="container">
        <div className="card">
          <img
            src={data.image}
            className="photo card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{data.name}</li>
            <li className="list-group-item">{data.email}</li>
            <li className="list-group-item">{desc}</li>
            <li className="list-group-item">
              <a href="/update">Edit</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
