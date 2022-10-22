import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
// import Signup from "./Components/Signup";
import Register from "./Pages/Register";
import Login from "./Components/Login";
import UpdateProfile from "./Components/UpdateProfile";
import Logout from "./Components/Logout";
import Post from "./Pages/Post";
import AllProducts from "./Pages/AllProduct";
import SinglePost from "./Pages/SinglePost";

function Routing() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/post" element={<Post />} />
      <Route path="/allProduct" element={<AllProducts />} />
      <Route path="/aProduct/:id" element={<SinglePost />} />
    </Routes>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <Routing />
    </div>
  );
}

export default App;
