import AppPagination from "../components/AppPagination";
import TodoList from "../components/TodoList";
import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const TodoPage = observer(() => {
  const { todos } = useContext(Context);
  const handleClick = (page) => {
    todos.setPage(page);
  };
  return (
    <div>
      <TodoList />
      <AppPagination
        active={todos.page}
        count={todos.totalCount}
        limit={todos.limit}
        handleClick={handleClick}
      />
    </div>
  );
});

export default TodoPage;
