import React from "react";
import { Routes, Route } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { TODO_ROUTE, LOGIN_ROUTE } from "../consts";
import TodoPage from "../pages/TodoPage";
import Login from "../pages/Login";

const AppRouter = observer(() => {
  return (
    <Routes>
      <Route path={TODO_ROUTE} element={<TodoPage />} />
      <Route path={LOGIN_ROUTE} element={<Login />} />
    </Routes>
  );
});

export default AppRouter;
