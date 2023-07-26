import React, { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../utils";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { TODO_ROUTE } from "../consts";

const Login = observer(() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const setLogin = (event) => {
    user.setLogin(event.target.value);
  };

  const setPass = (event) => {
    user.setPass(event.target.value);
  };

  const handleSubmit = async () => {
    const auth = await login(user.login, user.pass);
    user.setIsAuth(!!auth);
    if (auth) {
      navigate(TODO_ROUTE);
    }
  };

  return (
    <div class="d-flex flex-column">
      <Form className="login_btn">
        <Form.Control
          value={user.login}
          onChange={setLogin}
          placeholder={"Введите логин"}
          className="mb-3"
        />
        <Form.Control
          value={user.pass}
          onChange={setPass}
          placeholder={"Введите пароль"}
          className="mb-3"
        />
        <Button
          variant="primary"
          size="large"
          onClick={handleSubmit}
          className="login_btn"
        >
          Войти
        </Button>
      </Form>
    </div>
  );
});

export default Login;
