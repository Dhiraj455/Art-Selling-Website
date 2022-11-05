/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useEffect, useState } from "react";
import "./header.css";
import {
  Container,
  DropdownItem,
} from "reactstrap";
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

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const profileActionRef = useRef(null);
  const [x, setX] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    Autho().then((data) => {
      console.log(data);
      setX(data);
    });
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");
  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=" d-flex gap-2 align-items-center ">
              <span>
                <i class="ri-fire-fill"></i>
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
                <i class="ri-shopping-cart-line"></i>
              </span>
              <Link to="#">Cart</Link>
            </button>
            <div className="nav__icons">
              <div
                className="profile"
                onClick={() => (profileActionRef.style.display = "block")}
              >
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
                  {x ? (
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
                        navigate("/track");
                      }}
                    >
                      Track
                    </span>
                    <DropdownItem divider />
                    <span
                      onClick={() => {
                        navigate("/delivery");
                      }}
                    >
                      Delivery
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
                  ) : (
                    <div className="fs-5">
                      <Link to="/signup">Signup </Link>
                      <Link to="/login">Login </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} {...props}>
              <DropdownToggle color="transparent">
                <img src={x.image} alt="" />
                <button
                  className="btn d-flex gap-2 align-items-center dropdown-toggle"
                  data-toggle="dropdown"
                  // onClick={() => {
                  //   navigate("/profile");
                  // }}
                >
                  <span>
                    <i class="ri-account-circle-line"></i>
                  </span>
                  <Link to="#">Profile</Link>
                </button>
              </DropdownToggle>
              <DropdownMenu dark container="body">
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    navigate("/track");
                  }}
                >
                  Track
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate("/delivery");
                  }}
                >
                  Delivery
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate("/logout");
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            {/* <div class="btn-group">
              <button
                className="btn d-flex gap-2 align-items-center dropdown-toggle"
                data-toggle="dropdown"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                <span>
              <i class="ri-account-circle-line"></i>
              </span>
              <Link to="#">Profile</Link>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div> */}
          </div>
          <span className="mobile__menu">
            <i class="ri-menu-line" onClick={toggleMenu}></i>
          </span>
        </div>
      </Container>
    </header>
  );
};

export default Header;
