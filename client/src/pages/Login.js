import React, { useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { login } from "../utils";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { TODO_ROUTE } from "../consts";
import { ERRORS_TEXT } from "../consts";

const Login = observer(() => {
  const {
    user,
    user: { userCredentials },
    user: {
      userCredentials: { login: loginVal, pass },
    },
    user: {
      authErrors: { login: loginError, pass: passError },
      authResponseErrors: { userNotFound, passwordIncorrect },
    },
  } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      user.setUserCredentials({
        login: "",
        pass: "",
      });
    };
    // eslint-disable-next-line
  }, []);

  const setValue = (fieldName) => (event) => {
    user.setUserCredentials({
      ...userCredentials,
      [fieldName]: event.target.value,
    });
    user.setAuthErrors({
      login: loginError,
      pass: passError,
      [fieldName]: false,
    });
    user.setAuthResponseErrors({
      userNotFound: false,
      passwordIncorrect: false,
    });
  };

  const handleSubmit = async () => {
    const isErrors = !(loginVal && pass);
    if (isErrors) {
      user.setAuthErrors({
        login: !loginVal,
        pass: !pass,
      });
      return;
    }
    const response = await login(loginVal, pass);

    if (response.ok) {
      user.setIsAuth(true);
      navigate(TODO_ROUTE);
      return;
    }

    user.setAuthResponseErrors({
      userNotFound: response.message === "userNotFound",
      passwordIncorrect: response.message === "passwordIncorrect",
    });
  };

  return (
    <div className="d-flex flex-column">
      <Form className="login_btn">
        <div className="mb-3">
          <Form.Control
            required
            isInvalid={loginError || userNotFound}
            value={loginVal}
            onChange={setValue("login")}
            placeholder={"Введите логин"}
          />
          <Form.Control.Feedback type="invalid">
            {loginError ? ERRORS_TEXT.common : ERRORS_TEXT.userNotFound}
          </Form.Control.Feedback>
        </div>
        <div className="mb-3">
          <Form.Control
            required
            isInvalid={passError || passwordIncorrect}
            value={pass}
            onChange={setValue("pass")}
            placeholder={"Введите пароль"}
          />
          <Form.Control.Feedback type="invalid">
            {passError ? ERRORS_TEXT.common : ERRORS_TEXT.passwordIncorrect}
          </Form.Control.Feedback>
        </div>
        <Button
          variant="primary"
          size="large"
          className="login_btn"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </Form>
    </div>
  );
});

export default Login;
