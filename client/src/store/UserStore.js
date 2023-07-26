import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._login = "";
    this._pass = "";
    makeAutoObservable(this);
  }

  setIsAuth(val) {
    this._isAuth = val;
  }
  setUser(val) {
    this._user = val;
  }

  setLogin(val) {
    this._login = val;
  }

  setPass(val) {
    this._pass = val;
  }

  get isAuth() {
    return this._isAuth;
  }
  get user() {
    return this._user;
  }

  get login() {
    return this._login;
  }

  get pass() {
    return this._pass;
  }
}
