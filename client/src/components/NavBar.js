import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LOGIN_ROUTE, TODO_ROUTE } from "../consts";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    user.setUserCredentials({});
    user.setIsAuth(false);
  };

  const logIn = () => {
    navigate(LOGIN_ROUTE);
  };

  const redirectToTodo = () => {
    navigate(TODO_ROUTE);
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav className="ml-auto">
          <Button
            variant={"outline-light"}
            onClick={redirectToTodo}
            className="ml-2"
          >
            Перейти к задачам
          </Button>
        </Nav>
        <Nav className="ml-auto">
          <Button
            variant={"outline-light"}
            onClick={localStorage.getItem("token") ? logOut : logIn}
            className="ml-2"
          >
            {user.isAuth ? "Выйти" : "Войти"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
