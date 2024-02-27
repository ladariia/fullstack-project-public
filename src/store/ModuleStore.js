import { makeAutoObservable } from "mobx";

export default class ModuleStore {
    //работа с mobx
    constructor() {
        this._courses = [
        ]
        this._modules = [
        ]

        this._selectedCourse = {}
        this._selectedModule = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    setCourses(courses) {
        this._courses = courses
    }

    setModules(modules) {
        this._modules = modules
    }

    setSelectedCourse(course) {
        this._selectedCourse = course
    }

    setSelectedShedule(module) {
        this._selectedModule = module
    }

    get courses() {
        return this._courses
    }

    get modules() {
        return this._modules
    }

    get selectedCourse() {
        return this._selectedCourse
    }

    get selectedModule() {
        return this._selectedModule
    }
}