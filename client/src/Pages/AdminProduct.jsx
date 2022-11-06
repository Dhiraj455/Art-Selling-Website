import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { getPost } from "../Services/User";
import AdminProductCard from "../Components/Cards/AdminProductCard";
import Pagination from "../Components/Pagination/Pagination";

function AdminProduct() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let limit = 4;
  const pageChange = (pageNo) => {
    setPage(pageNo);
  };

  useEffect(() => {
    try {
      Autho().then((user) => {
        if (!user.isAdmin) {
          navigate("/");
        }
      });
      getPost(page,limit).then((data) => {
        setPosts(data.data.result);
        setTotalPages(data.data.totalPage);
      });
    } catch (err) {
      console.log(err);
    }
  }, [page, limit]);

  return (
    <>
      <CommonSection title="All Users Posts" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Users Posts</h3>
              </div>
            </Col>

            {posts.map((post, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                <AdminProductCard posts={post} key={post._id} />
              </Col>
            ))}
            <div>
              <Pagination
                pageChange={pageChange}
                totalPages={totalPages}
                page={page}
              />
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminProduct;
