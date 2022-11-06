import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import { Container, DropdownItem } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import user_icon1 from "../../Assets/images/ava-01.png";
import { NavLink, Link } from "react-router-dom";
import Autho from "../../Helpers/AuthHelp";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Market",
    url: "/market",
  },
  {
    display: "Post",
    url: "/post",
  },
];

const ADMIN_NAV__LINKS = [
  {
    display: "Users",
    url: "/admin",
  },
  {
    display: "Products",
    url: "/adminPosts",
  },
];

const USER_NAV__LINKS = [
  {
    display: "Track",
    url: "/track",
  },
  {
    display: "Delivery",
    url: "/delivery",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const [x, setX] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    Autho().then((data) => {
      setX(data);
      window.addEventListener("scroll", () => {
        if (
          document.body.scrollTop > 80 ||
          document.documentElement.scrollTop > 80
        ) {
          document.getElementById("head").classList.add("header__shrink");
        } else {
          document.getElementById("head").classList.remove("header__shrink");
        }
      });
    });
  }, []);

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");
  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" id="head" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i className="ri-fire-fill"></i>
              </span>
              METART
            </h2>
          </div>

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.url}
                    className={(navClass) =>
                      navClass.isActive ? "active" : ""
                    }
                  >
                    {item.display}
                  </NavLink>
                </li>
              ))}
              {!x.isAdmin ? (
                <>
                  {USER_NAV__LINKS.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {ADMIN_NAV__LINKS.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-1 ">
            <button
              className="btn d-flex gap-2 align-items-center"
              onClick={() => {
                navigate("/mycart");
              }}
            >
              <span>
                <i className="ri-shopping-cart-line"></i>
              </span>
              <Link to="#">Cart</Link>
            </button>
            <div className="nav__icons">
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={x ? x.image : user_icon1}
                  alt=""
                  onClick={toggleProfileActions}
                />

                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  <>
                    <span
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </span>
                    <DropdownItem divider />
                    <span
                      onClick={() => {
                        navigate("/logout");
                      }}
                    >
                      Logout
                    </span>
                  </>
                </div>
              </div>
            </div>
          </div>
          <span className="mobile__menu">
            <i className="ri-menu-line" onClick={toggleMenu}></i>
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
