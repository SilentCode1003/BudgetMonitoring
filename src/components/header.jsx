import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../assets/style.css'

function Header() {
  return (
    <>
    <Navbar className='bms-navbar-bg' expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href="\Index">
          <img
              alt=""
              src="src\assets\img\5L-logo-white.png"
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
            <div className="input-group">
                <input className="form-control border-end-0 border" type="search" placeholder='Search' id="example-search-input"/>
                <span className="input-group-append">
                    <button className="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5 btn-border" type="button">
                        <i className="fa fa-search"></i>
                    </button>
                </span>
            </div>
            <Nav className='flex-grow-1 user-profile hidden-mobile' href="/Index">(Username)</Nav>
            <img
                  alt=""
                  src="src\assets\img\undraw_profile.svg"
                  height="35"
                  className="d-inline-block align-top"
              />
          </Form>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </>
  );
}

export default Header;