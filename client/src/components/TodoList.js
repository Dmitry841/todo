import React, { useContext, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchItems } from "../utils";
import TodoItem from "./TodoItem";
import CreateTodo from "./ModalCreateTodo";
import { sortProps } from "../consts";

const TodoList = observer(() => {
  const { todos, user } = useContext(Context);

  useEffect(() => {
    fetchItems(todos.sortOrder, todos.page).then((data) => {
      todos.setTotalCount(data.count);
      todos.setTodos(data.todos);
    });
    // eslint-disable-next-line
  }, [todos.page, todos.sortOrder, todos.totalCount, todos.isUpdate]);

  const handleSortFieldClick = (event) => {
    todos.setSortOrder({ ...todos.sortOrder, field: event.target.value });
  };

  const handleSortDirectionClick = () => {
    const direction = todos.sortOrder.direction === "ASC" ? "DESC" : "ASC";
    todos.setSortOrder({ ...todos.sortOrder, direction });
  };

  return (
    <Container>
      <div className="list_btn">
        <div class="d-flex flex-column">
          <Button
            variant="secondary"
            onClick={todos.setIsShowCreateModal.bind(todos)}
            className="mb-3"
          >
            Добавить новую задачу
          </Button>
          <Button
            variant="outline-danger"
            onClick={handleSortDirectionClick}
            className="mb-3"
          >
            {sortProps[todos.sortOrder.direction]}
          </Button>
          {sortProps.field.map((item) => (
            <Button
              value={item[0]}
              variant="outline-danger"
              onClick={handleSortFieldClick}
              className="mb-3"
            >
              {item[1]}
            </Button>
          ))}
        </div>
      </div>
      {todos.todos.map((todo) => {
        return (
          <>
            <TodoItem todo={todo} key={todo.id} isAuth={user.isAuth} />
          </>
        );
      })}
      <CreateTodo show={todos.isShowCreateModal}></CreateTodo>
    </Container>
  );
});

export default TodoList;
