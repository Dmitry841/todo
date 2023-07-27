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
      isEdited: false,
    };
    this._todoDescription = "";
    this._todoErrors = {
      userName: false,
      userEmail: false,
      todoDescription: false,
    };
    this._isShowModal = false;
    this._isEditModal = false;
    this._isUpdate = false;
    this._isSuccess = false;
    this._overlayText = "";
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

  setIsShowModal() {
    this._isShowModal = !this._isShowModal;
  }

  setIsEditModal(val) {
    this._isEditModal = val;
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

  setTodoErrors(val) {
    this._todoErrors = val;
  }

  setOverlayText(val) {
    this._overlayText = val;
  }

  setTodoDescription(val) {
    this._todoDescription = val;
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

  get isShowModal() {
    return this._isShowModal;
  }

  get isEditModal() {
    return this._isEditModal;
  }

  get isUpdate() {
    return this._isUpdate;
  }

  get sortOrder() {
    return this._sortOrder;
  }

  get todoErrors() {
    return this._todoErrors;
  }

  get overlayText() {
    return this._overlayText;
  }

  get todoDescription() {
    return this._todoDescription;
  }
}
