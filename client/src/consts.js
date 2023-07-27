export const LOGIN_ROUTE = "/login";
export const TODO_ROUTE = "/";

export const sortProps = {
  DESC: "Сортировка по возрастанию",
  ASC: "Сортировка по убыванию",

  field: [
    ["userName", "Сортировка по имени"],
    ["userEmail", "Сортировка по почте"],
    ["todoDescription", "Сортировка по описанию задачи"],
  ],
};

export const ERRORS_TEXT = {
  common: "Поле обязательно для заполнения",
  email: "Такой адрес недопустим",
  userNotFound: "Пользователь не найден",
  passwordIncorrect: "Пароль не верный",
  duplicateUser: "Пользователь с таким email уже существует",
};
