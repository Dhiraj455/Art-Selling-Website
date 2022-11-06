import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getAllUser } from "../Services/Admin";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import UsersCard from "../Components/Cards/UserCards";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination/Pagination";

function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
      getAllUser(page, limit).then((data) => {
        setUsers(data.data.result);
        setTotalPages(data.data.totalPage);
      });
    } catch (err) {
      console.log(err);
    }
  }, [page, limit, totalPages]);

  return (
    <>
      <CommonSection title="All Users" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Users</h3>
              </div>
            </Col>

            {users.map((user, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={key}>
                <UsersCard user={user} key={user._id} />
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

export default AllUser;
