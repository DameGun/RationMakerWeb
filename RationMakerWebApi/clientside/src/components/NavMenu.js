// @ts-nocheck
import React, { useState } from "react";
import {
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavbarText,
} from "reactstrap";
import "./NavMenu.css";
import { logoutUser } from "../service/ApiCalls";
import useAuth from "../service/useAuth";

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const context = useAuth();
  let menu;

  const toggle = () => setIsOpen(!isOpen);

  const logout = async () => {
    await logoutUser();
  };

  if (!context.auth.accessToken) {
    menu = (
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
      </Nav>
    );
  } else {
    menu = (
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href="/" onClick={logout}>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );
  }

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">
          <b>RationMaker (Beta)</b>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          {menu}
        </Collapse>
        <NavbarText>{context.auth?.email}</NavbarText>
      </Navbar>
      <Navbar
        className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
        container
        light
      ></Navbar>
    </div>
  );
}
