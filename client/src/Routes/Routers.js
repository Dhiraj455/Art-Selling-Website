import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home"
import About from "../Pages/AboutUser"
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
// import UpdateProfile from "../Pages/UpdateProfile";
import UpdateProfile from "../Pages/UpdateProfile";
import Logout from "../Pages/Logout";
import Post from "../Pages/Post";
import AllProducts from "../Pages/AllProduct";
import SinglePost from "../Pages/SinglePost";
import MyCart from "../Pages/MyCart";
import OtherUserProfile from "../Pages/OtherUserProfile"
import UpdatePost from "../Pages/UpdatePost";
import Track from "../Pages/Track";

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/track" element={<Track />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/post" element={<Post />} />
      <Route path="/market" element={<AllProducts />} />
      <Route path="/aProduct/:id" element={<SinglePost />} />
      <Route path="/otherUser/:id" element={<OtherUserProfile />} />
      <Route path="/mycart" element={<MyCart />} />
      <Route path="/updatePost/:id" element={<UpdatePost />} />
    </Routes>
  );
}

export default Routers;
