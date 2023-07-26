import React, { useContext } from "react";
import { Card, Form, Container } from "react-bootstrap";
import { Context } from "../index";
import { updateItem } from "../utils";
import { observer } from "mobx-react-lite";

export const TodoItem = ({
  todo: { userName, userEmail, id, todoDescription, isChecked },
  isAuth,
}) => {
  const { todos } = useContext(Context);
  const handleChange = async (event) => {
    const todo = todos.todos.find((todo) => todo.id === event.target.value);
    if (todo) {
      await updateItem({ ...todo, isChecked: !todo.isChecked });
      todos.setIsUpate(!todos.isUpdate);
    }
  };
  return (
    <Container>
      <Card className="text-center todoItem">
        <Card.Header>Задача</Card.Header>
        <Card.Body>
          <Card.Title>{userName}</Card.Title>
          <Card.Title>{userEmail}</Card.Title>
          <Card.Text>{todoDescription}</Card.Text>
          {isAuth && (
            <Form.Check
              value={id}
              inline
              label="Выполнено"
              checked={isChecked}
              onChange={handleChange}
            />
          )}
        </Card.Body>
        <Card.Footer className="text-muted">Задача</Card.Footer>
      </Card>
      <div className="todo_item" />
    </Container>
  );
};

export default observer(TodoItem);
