import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken, selectUser } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
// import { selectBusiness } from "../../store/eventDetails/selectors";
import "./styles.css";
import { selectEventDetails } from "../../store/eventDetails/selectors";

export default function Navigation() {
  const token = useSelector(selectToken);
  // const isBusiness = useSelector(selectBusiness);
  const user = useSelector(selectUser);
  const event = useSelector(selectEventDetails);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar bg="dark" expand="light" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        Beer Boutique
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        style={{ borderRadius: 100 }}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <NavbarItem path="/" linkText="Events" />
          {token && user.isBusiness ? (
            <NavbarItem
              path={`/business/${event.business.id}`}
              linkText="My Profile"
            />
          ) : null}
          {token && user.isBusiness ? (
            <NavbarItem path="/beer" linkText="Post a Beer" />
          ) : null}
          {token && user.isBusiness ? (
            <NavbarItem path="/postEvent" linkText="Post an Event" />
          ) : null}
          {token && !user.isBusiness ? (
            <NavbarItem path="/customer/profile" linkText="My Profile" />
          ) : null}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
