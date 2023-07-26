import { makeAutoObservable } from "mobx";

export default class TodosStore {
  constructor() {
    this._todos = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._todo = {
      userName: "",
      userEmail: "",
      todoDescription: "",
    };
    this._isShowCreateModal = false;
    this._isUpdate = false;
    this._sortOrder = { direction: "ASC", field: "userName" };
    makeAutoObservable(this);
  }

  setTodos(todos) {
    this._todos = todos;
  }

  setTodo(todo) {
    this._todo = todo;
  }

  setPage(page) {
    this._page = page;
  }

  setIsShowCreateModal() {
    this._isShowCreateModal = !this._isShowCreateModal;
  }

  setIsUpate() {
    this._isUpdate = !this._isUpdate;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }
  setSortOrder(val) {
    this._sortOrder = val;
  }

  get todos() {
    return this._todos;
  }
  get todo() {
    return this._todo;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }

  get isShowCreateModal() {
    return this._isShowCreateModal;
  }

  get isUpdate() {
    return this._isUpdate;
  }

  get sortOrder() {
    return this._sortOrder;
  }
}
