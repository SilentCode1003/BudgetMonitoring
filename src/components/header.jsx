import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/img/5L-logo-white.png';
import '../assets/style.css'

function Header() {
  return (
    <>
    <Navbar className='bms-navbar-bg' expand="lg" variant='dark'>
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
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          </Nav>
          <Nav className="justify-content-end pe-3">
            <Nav.Link href="/Index">Home</Nav.Link>
            <NavDropdown title="Request" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/Request">Request Details</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/RequestItems">Request Items</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Form className="d-flex">
            <div className="input-group mt-1">
                <input className="form-control border-end-0 border" type="search" placeholder='Search' id="example-search-input"/>
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5 btn-border header-btn" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
            <div className="d-flex">
              <Nav className='flex-grow-1 user-profile hidden-mobile' href="/Index">(Username)</Nav>
              <NavDropdown title={<img alt="user-profile" src={logo} height={35} className='d-inline-block align-top user-profile-picture user-dropdown'/>} id="user-profile-dropdown">
                <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </div>
          </Form>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </>
  );
}

export default Header;