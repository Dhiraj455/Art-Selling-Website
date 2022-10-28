import React, { useEffect, useState } from "react";
import Autho from "../Helpers/AuthHelp";
import "./s.css";
import { getProfile, getMyPosts, getBoughtItems } from "../Services/User";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
// import { useParams } from "react-router-dom";

function About(res) {
  const [data, setData] = useState([]);
  const [desc, setDesc] = useState("");
  const [products, setProducts] = useState([]);
  const [x, setX] = useState([]);
  const callAbout = async () => {
    try {
      const data = await Autho();
      setX(data);
      getProfile(data._id).then((profile) => {
        console.log(profile.data);
        setData(profile.data.result);
        if (profile.data.result.description === "") {
          setDesc("No description added");
        } else {
          setDesc(profile.data.result.description);
        }
      });
      // getMyPosts().then((data) => {
      //   setProducts(data.data.result);
      //   console.log(data.data.result);
      // });
      getBoughtItems().then((data) => {
        setProducts(data.data.result);
        console.log(data.data.result);
      });
      // if (data === "MyPost") {
        
      // } else if (data === "Bought") {
      //   getBoughtItems().then((data) => {
      //     setProducts(data.data.result);
      //     console.log(data.data.result);
      //   });
      // }
      // const base64string = btoa(
      //   String.fromCharCode(...new Uint8Array(data.image.data.data)).toString()
      // );
      // setImage(base64string);
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
          <img src={data.image} className="photo card-img-top" alt="Some" />
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
        <Link to="/post">POST</Link>
      </div>
      <br />
      <br />
      <button>MyPosts</button>
      <br />
      <br />
      <button>Bought</button>
      <br />
      <br />
      {products.map((product, key) => (
        <div className="container">
          <ProductCard product={product} userId={x._id} />
        </div>
      ))}
    </>
  );
}

export default About;
