import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { selectBusiness } from "../../store/eventDetails/selectors";
import "./styles.css";

export default function Navigation() {
  const token = useSelector(selectToken);
  const isBusiness = useSelector(selectBusiness);
  const user = useSelector(selectUser);

  console.log("isBusiness", isBusiness.id);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="dark" expand="light" variant="dark" fixed="top">
      <Navbar.Brand as={NavLink} to="/">
        Beer Boutique
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Events" />
          {token && user.isBusiness ? (
            <NavbarItem path={`/business/${user.id}`} linkText="My Profile" />
          ) : null}
          {token && user.isBusiness ? (
            <NavbarItem path="/beer" linkText="Post a Beer" />
          ) : null}
          {token && user.isBusiness ? (
            <NavbarItem path="/postEvent" linkText="Post an Event" />
          ) : null}
          {token && !user.isBusiness ? (
            <NavbarItem path="/noBusiness" linkText="My Profile" />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
