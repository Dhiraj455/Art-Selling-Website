import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../App";

// function Render() {
//   // const [isOpen, setIsOpen] = useState(false);
//   const {state,dispatch} = useContext(UserContext);
//   console.log(dispatch);
//   // setIsOpen(false);
//   if (state) {
//     return (
//       <>
//         <li className="nav-item">
//           <NavLink className="nav-link active" aria-current="page" to="/">
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/about">
//             About
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/signup">
//             Signup
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/login">
//             Login
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/logout">
//             Logout
//           </NavLink>
//         </li>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <li className="nav-item">
//           <NavLink className="nav-link active" aria-current="page" to="/">
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/about">
//             About
//           </NavLink>
//         </li>
//         {/* <li className="nav-item">
//           <NavLink className="nav-link" to="/signup">
//             Signup
//           </NavLink>
//         </li>
//         <li className="nav-item">
//           <NavLink className="nav-link" to="/login">
//             Login
//           </NavLink>
//         </li> */}
//         <li className="nav-item">
//                 <NavLink className="nav-link" to="/logout">
//                   Logout
//                 </NavLink>
//               </li>
//       </>
//     );
//   }
// }
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Signup
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/logout">
            Logout
          </NavLink>
        </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
