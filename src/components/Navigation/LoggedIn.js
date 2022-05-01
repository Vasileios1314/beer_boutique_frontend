import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Link to={`/`}>
      <>
        <Nav.Item md="true" style={{ padding: ".5rem 1rem", color: "white" }}>
          {user.email}
        </Nav.Item>
        <Button
          variant="secondary"
          style={{ borderRadius: 100, width: "100%" }}
          onClick={() => dispatch(logOut())}
        >
          Logout
        </Button>
      </>
    </Link>
  );
}
