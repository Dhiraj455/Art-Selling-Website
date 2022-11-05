import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/AboutUser";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import UpdateProfile from "../Pages/UpdateProfile";
import Logout from "../Pages/Logout";
import Post from "../Pages/Post";
import AllProducts from "../Pages/AllProduct";
import SinglePost from "../Pages/SinglePost";
import MyCart from "../Pages/MyCart";
import OtherUserProfile from "../Pages/OtherUserProfile";
import UpdatePost from "../Pages/UpdatePost";
import Track from "../Pages/Track";
import Delivery from "../Pages/Delivery";
import AllUser from "../Pages/AllUsers";
import { useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { useState } from "react";
import Error404 from "../Pages/Error";

function Routers() {
  const [x, setX] = useState([]);
  useEffect(() => {
    Autho().then((data) => {
      setX(data);
    });
  }, []);
  return (
    <Routes>
      {x.isAdmin ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track" element={<Track />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/post" element={<Post />} />
          <Route path="/admin" element={<AllUser />} />
          <Route path="/market" element={<AllProducts />} />
          <Route path="/aProduct/:id" element={<SinglePost />} />
          <Route path="/otherUser/:id" element={<OtherUserProfile />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/updatePost/:id" element={<UpdatePost />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/track" element={<Track />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/post" element={<Post />} />
          <Route path="/market" element={<AllProducts />} />
          <Route path="/aProduct/:id" element={<SinglePost />} />
          <Route path="/otherUser/:id" element={<OtherUserProfile />} />
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/updatePost/:id" element={<UpdatePost />} />
          <Route element={<Error404 />} />
        </>
      )}
    </Routes>
  );
}

export default Routers;
