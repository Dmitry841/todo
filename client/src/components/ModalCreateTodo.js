import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button } from "react-bootstrap";
import { addItem } from "../utils";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const CreateTodo = observer(({ show }) => {
  const { todos } = useContext(Context);

  const setValue = (fieldName) => (event) => {
    todos.setTodo({ ...todos.todo, [fieldName]: event.target.value });
  };

  const onHide = () => {
    todos.setIsShowCreateModal();
  };

  const addTodo = () => {
    addItem(todos.todo).then((data) => {
      todos.setTodo({});
      onHide();
    });
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
          <Form.Control
            value={todos.todo.userName}
            onChange={setValue("userName")}
            placeholder={"Введите имя пользователя"}
          />
          <Form.Control
            value={todos.todo.userEmail}
            onChange={setValue("userEmail")}
            placeholder={"Введите email"}
          />
          <Form.Control
            value={todos.todo.todoDescription}
            onChange={setValue("todoDescription")}
            placeholder={"Введите описание задачи"}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addTodo}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateTodo;
