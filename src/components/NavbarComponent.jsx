import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import logo from "../logo.png";
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset, LoginUser } from "../features/authSlice";
import { NavLink, useNavigate } from "react-router-dom";


const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const login = () => {
    dispatch(LoginUser());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar className='is-fixed-top'  bg="primary" variant="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">
        <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Kyoshi salon logo"
            /> {'  '}
            <strong>Kyoshi Salon </strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/"> <strong>Home</strong></Nav.Link>
          <Nav.Link href="#contact"><strong>Contact</strong></Nav.Link>
          <NavDropdown title="Product" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Daftar Kategori</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Login
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Daftar Produk Salon</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Vitamin Rambut
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Button variant="outline-light" href="/login">Login</Button>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent
