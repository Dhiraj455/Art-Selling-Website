import { Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
import Home from "../Pages/Home"
import About from "../Pages/AboutUser"
// import Signup from "./Components/Signup";
import Register from "../Pages/Register";
import Login from "../Components/Login";
import UpdateProfile from "../Pages/UpdateProfile";
import Logout from "../Components/Logout";
import Post from "../Pages/Post";
import AllProducts from "../Pages/AllProduct";
import SinglePost from "../Pages/SinglePost";
import MyCart from "../Pages/MyCart";
import OtherUserProfile from "../Pages/OtherUserProfile"

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<About />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/post" element={<Post />} />
      <Route path="/market" element={<AllProducts />} />
      <Route path="/aProduct/:id" element={<SinglePost />} />
      <Route path="/otherUser/:id" element={<OtherUserProfile />} />
      <Route path="/mycart" element={<MyCart />} />
    </Routes>
  );
}

export default Routers;
