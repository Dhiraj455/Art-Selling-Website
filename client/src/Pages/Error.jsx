import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Assets/css/error.css";

function Error404() {
  useEffect(() => {
    var container = document.getElementById("container");
    window.onmousemove = function (e) {
      var x = -e.clientX / 5;
      var y = -e.clientY / 5;
      container.style.backgroundPositionX = x + "px";
      container.style.backgroundPositionY = y + "px";
    };
  }, []);

  return (
    <>
      <section>
        <div id="container">
          <div class="content">
            <h2 class="h2">404</h2>
            <h4 class="h4">Oops! Page not found</h4>
            <p class="p">
              The page you were looking for doesn't exist. You may have mistyped
              the address or the page may have moved.
            </p>
            <Link to={"/"}>Back To Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error404;
