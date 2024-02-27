import { makeAutoObservable } from "mobx";

export default class UserStore {
    //работа с mobx
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    //Actionы
    // - любой блок кода, который может изменять такие данные (state): пользовательские события, внутренние данные и т.д.
    setIsAuth(bool) {
        this._isAuth = bool
    }

    //Action для изм пользователя
    setUser(user) {
        this._user = user
    }

    //создадим геттеры - для получения каких-то пременных из состояния
    //вызываются только в том случае, если перменная кя была внутри была изменена
    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

}