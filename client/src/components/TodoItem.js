import React, { useContext } from "react";
import { Card, Form, Container, Button } from "react-bootstrap";
import { Context } from "../index";
import { postItem } from "../utils";
import { observer } from "mobx-react-lite";
import RowItem from "./RowItem";

export const TodoItem = ({
  todo: { userName, userEmail, id, todoDescription, isChecked, isEdited },
  isAuth,
}) => {
  const { todos } = useContext(Context);
  const handleCheckboxChange = async (event) => {
    const todo = todos.todos.find((todo) => todo.id === event.target.value);
    if (todo) {
      await postItem({ ...todo, isChecked: !todo.isChecked }, "update");
      todos.setIsUpate(!todos.isUpdate);
    }
  };

  const handleEdit = (event) => {
    const todo = todos.todos.find((todo) => todo.id === event.target.value);
    todos.setTodoDescription(todo.todoDescription);
    todos.setTodo({ ...todo });
    todos.setIsEditModal(true);
    todos.setIsShowModal(true);
  };
  return (
    <Container>
      <Card className="text-center todo_item">
        <Card.Header>Задача</Card.Header>
        <Card.Body>
          <RowItem label="Имя пользователя:" value={userName} />
          <RowItem label="Почта:" value={userEmail} />
          <RowItem
            label="Статус"
            value={
              isAuth ? (
                <Form.Check
                  value={id}
                  inline
                  label={isChecked ? "Выполнено" : "В работе"}
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
              ) : isChecked ? (
                "Выполнено"
              ) : (
                "В работе"
              )
            }
          />
          {isEdited && (
            <Card.Subtitle>
              <p className="todo_item_subtitle">
                Отредактировано администратором
              </p>
            </Card.Subtitle>
          )}
          <Card.Title>Описание</Card.Title>
          <Card.Text className="card">{todoDescription}</Card.Text>
          {isAuth && (
            <Button variant="primary" onClick={handleEdit} value={id}>
              Редактировать
            </Button>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">Задача</Card.Footer>
      </Card>
    </Container>
  );
};

export default observer(TodoItem);
