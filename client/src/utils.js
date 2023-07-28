// import jwt_decode from "jwt-decode";

export const login = async (userName, password) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/user/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ userName, password }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("token", data.token);
    // return jwt_decode(data.token);
    return response;
  }
  const data = await response.json();
  return data;
};

export const check = async () => {
  const { data } = await fetch(`${process.env.REACT_APP_BASE_URL}/api/todo`);
  localStorage.setItem("token", data?.token);
  return;
};

export const fetchItems = async (sortOrder, page, limit = 3) => {
  const url = new URL(`${process.env.REACT_APP_BASE_URL}/api/todo`);
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

export const postItem = async (data, path) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/api/todo/${path}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  return response.status;
};

export const emailValidater = (val) =>
  val
    ? /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gim.test(
        val
      )
    : false;
