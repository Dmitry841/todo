import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { postItem, fetchItems } from "../utils";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { ERRORS_TEXT, LOGIN_ROUTE } from "../consts";
import { emailValidater } from "../utils";
import { useNavigate } from "react-router-dom";

const ModalTodo = observer(({ show }) => {
  const {
    todos,
    todos: {
      todo,
      todoErrors: {
        userName: nameError,
        userEmail: emailError,
        todoDescription: descriptionError,
      },
      isEditModal,
      sortOrder,
      page,
      limit,
    },
    todos: {
      todo: { userName, userEmail, todoDescription },
    },
  } = useContext(Context);

  const navigate = useNavigate();

  const setValue = (fieldName) => (event) => {
    todos.setTodo({
      ...todo,
      [fieldName]: event.target.value,
    });
    todos.setTodoErrors({
      userName: nameError,
      userEmail: emailError,
      todoDescription: descriptionError,
      [fieldName]: false,
    });
  };

  const onHide = () => {
    todos.setIsShowModal();
    todos.setIsEditModal(false);
    todos.setTodo({});
  };

  const handleSubmit = async () => {
    const isEmailValid = emailValidater(userEmail);
    const isErrors = !(userName && isEmailValid && todoDescription);
    if (isErrors) {
      todos.setTodoErrors({
        userName: !userName,
        userEmail: !emailValidater(userEmail),
        todoDescription: !todoDescription,
      });
      return;
    }

    if (isEditModal && !(await localStorage.getItem("token"))) {
      onHide();
      navigate(LOGIN_ROUTE);
      return;
    }

    const status = await postItem(
      {
        ...todo,
        isEdited: isEditModal && todoDescription !== todos.todoDescription,
      },
      isEditModal ? "update" : "create"
    );
    fetchItems(sortOrder, page, limit);
    if (status === 200) {
      todos.setOverlayText("Задача успешно сохранена");
    } else {
      todos.setOverlayText("Произошла ошибка");
    }
    todos.setTodo({});

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить задачу
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="mb-3">
            <Form.Control
              required
              isInvalid={nameError}
              value={userName}
              onChange={setValue("userName")}
              placeholder={"Введите имя пользователя"}
            />
            <Form.Control.Feedback type="invalid">
              {ERRORS_TEXT.common}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Control
              required
              isInvalid={emailError}
              value={userEmail}
              onChange={setValue("userEmail")}
              placeholder={"Введите email"}
            />
            <Form.Control.Feedback type="invalid">
              {ERRORS_TEXT.email}
            </Form.Control.Feedback>
          </div>
          <div className="mb-3">
            <Form.Control
              required
              isInvalid={descriptionError}
              value={todoDescription}
              onChange={setValue("todoDescription")}
              placeholder={"Введите описание задачи"}
            />
            <Form.Control.Feedback type="invalid">
              {ERRORS_TEXT.common}
            </Form.Control.Feedback>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default ModalTodo;
