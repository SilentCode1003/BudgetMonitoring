import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../assets/img/5L-logo-white.png";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../assets/style.css";

function Header() {
  const [loading, setLoading] = useState(true);
  const { userData } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  //console.log(userData)
  const handleLogout = () => {
    logout();
    Swal.fire({
      title: "Notice",
      text: "Log Out Successful",
      icon: "success",
    });
    navigate("/Login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading && !userData) {
      Swal.fire({
        title: "Notice",
        text: "Please Log in first",
        icon: "warning",
      });
      navigate("/Login");
    }
  }, [loading, userData, navigate]);

  return (
    <>
      <header>
        <Navbar className="bms-navbar-bg" expand="lg" variant="dark">
          <Container fluid>
            <div className="hidden-logo">
              <img
                alt=""
                src={logo}
                height="35"
                className="d-inline-block align-top"
              />
            </div>
            <Navbar.Brand href="\Index">
              <img
                alt=""
                src={logo}
                height="35"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
            <Navbar.Brand>Budget Monitoring System</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
              <Nav className="justify-content-end pe-3">
                <Nav.Link href="/Index">Home</Nav.Link>
                <NavDropdown
                  title="Request"
                  id="collasible-nav-dropdown header-menu-requests"
                >
                  <NavDropdown.Item href="/Request">
                    Request Details
                  </NavDropdown.Item>
                  {/*                   <NavDropdown.Divider />
                  <NavDropdown.Item href="/Tester">Request Items</NavDropdown.Item> */}
                </NavDropdown>
              </Nav>

              <Form className="d-flex">
                <div className="input-group mt-1">
                  <input
                    className="form-control border-end-0 border"
                    type="search"
                    placeholder="Search"
                    id="example-search-input"
                  />
                  <span className="input-group-append">
                    <button
                      className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5 btn-border header-btn"
                      type="button"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </Form>
              <Nav className="justify-content-end pe-3">
                <NavDropdown
                  title={userData && userData.fullname}
                  id="collasible-nav-dropdown header-menu-requests"
                >
                  <NavDropdown.Item href="/Request">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      {loading && (
        <div className="loading-screen-overlay">
          <div className="loading-spinner">
            <h5 className="white-text">Fetching Data...</h5>
            <div className="spinner-border" role="status"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
