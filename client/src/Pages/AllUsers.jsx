import React, { useState, useEffect } from "react";
import Autho from "../Helpers/AuthHelp";
import { getAllUser } from "../Services/Admin";
import CommonSection from "../Components/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import UsersCard from "../Components/Cards/UserCards";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [x, setX] = useState([]);
  const Update = async () => {
    try {
      let user = await Autho();
      setX(user);
      console.log(user._id);
      if(!user.isAdmin){
        navigate("/")
      }
      getAllUser().then((data) => {
        setUsers(data.data.result);
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
      <CommonSection title="All Users" />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="live__auction__top d-flex align-items-center justify-content-between ">
                <h3>Users</h3>
                {/* <span>
                <Link to="/market">Explore more</Link>
              </span> */}
              </div>
            </Col>

            {users.map((user, key) => (
              <Col lg="3" md="4" sm="6" className="mb-4">
                <UsersCard user={user} key={user._id} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AllUser;
