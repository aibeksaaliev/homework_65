import React from 'react';
import {Container} from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import {NavLink} from "react-router-dom";
import {PagesType} from "../../types";

interface NavBarProps {
  pages: PagesType [];
}

const NavBar: React.FC<NavBarProps> = ({pages}) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><NavLink to="/" className="text-white text-decoration-none">STATIC</NavLink></Navbar.Brand>
          <Nav className="d-flex w-100">
            {Object.keys(pages).map(page => {
              return <NavLink key={page} to={"/pages/" + page} className="nav-link">{page.charAt(0).toUpperCase() + page.slice(1)}</NavLink>
            })}
            <NavLink to="/pages/admin" className="nav-link ms-auto">Admin</NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;