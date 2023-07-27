import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = localStorage.getItem("token");
    this._userCredentials = {
      login: "",
      pass: "",
    };
    this._authErrors = {
      login: false,
      pass: false,
    };
    this._authResponseErrors = {
      duplicateUser: false,
      passwordIncorrect: false,
    };
    makeAutoObservable(this);
  }

  setIsAuth(val) {
    this._isAuth = val;
  }
  setUserCredentials(val) {
    this._userCredentials = val;
  }

  setLogin(val) {
    this._login = val;
  }

  setPass(val) {
    this._pass = val;
  }

  setAuthErrors(val) {
    this._authErrors = val;
  }

  setAuthResponseErrors(val) {
    this._authResponseErrors = val;
  }

  get isAuth() {
    return this._isAuth;
  }
  get userCredentials() {
    return this._userCredentials;
  }

  get login() {
    return this._login;
  }

  get pass() {
    return this._pass;
  }

  get authErrors() {
    return this._authErrors;
  }

  get authResponseErrors() {
    return this._authResponseErrors;
  }
}
