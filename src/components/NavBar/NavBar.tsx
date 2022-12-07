import React from 'react';
import {Container} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><NavLink to="/pages/home" className="text-white text-decoration-none">STATIC</NavLink></Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/pages/home" className="nav-link">Home</NavLink>
            <NavLink to="/pages/about" className="nav-link">About</NavLink>
            <NavLink to="/pages/mission" className="nav-link">Mission</NavLink>
            <NavLink to="/pages/contacts" className="nav-link">Contacts</NavLink>
            <NavLink to="/pages/admin" className="nav-link">Admin</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;