import jwt_decode from "jwt-decode";

export const login = async (userName, password) => {
  const response = await fetch("http://localhost:5000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ userName, password }),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
  }
  return null;
};

export const check = async () => {
  const { data } = await fetch("http://localhost:5000/api/todo");
  localStorage.setItem("token", data?.token);
  return;
};

export const fetchItems = async (sortOrder, page, limit = 3) => {
  const url = new URL("http://localhost:5000/api/todo");
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  url.searchParams.set("sortDirection", sortOrder.direction);
  url.searchParams.set("sortField", sortOrder.field);
  const response = await fetch(url);
  const data = await response.json();
  data.todos.map((item) => {
    item.id = String(item.id);
    return item;
  });
  return data;
};

export const addItem = async (data) => {
  await fetch("http://localhost:5000/api/todo/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const updateItem = async (data) => {
  await fetch("http://localhost:5000/api/todo/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};
