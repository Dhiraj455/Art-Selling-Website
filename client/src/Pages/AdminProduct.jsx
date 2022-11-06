import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getPost } from "../Services/User";
import AdminProductCard from "../Components/Cards/AdminProductCard";

function AdminProduct() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [x, setX] = useState([]);
  const Update = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
      if(!user.isAdmin){
        navigate("/")
      }
      getPost().then((data) => {
        setPosts(data.data.result);
        console.log(data.data.result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(x);
  useEffect(() => {
    Update();
  }, []);

  return (
    <>
      <CommonSection title="All Users Posts" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Users Posts</h3>
                {/* <span>
                <Link to="/market">Explore more</Link>
              </span> */}
              </div>
            </Col>

            {posts.map((post, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <AdminProductCard posts={post} key={post._id} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminProduct;