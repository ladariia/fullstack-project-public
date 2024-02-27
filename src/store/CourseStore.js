import { makeAutoObservable } from "mobx";

export default class CourseStore {
    //работа с mobx
    constructor() {
        this._types = [

        ]
        this._formats = [

        ]

        this._documents = [

        ]
        this._courses = [
        ]

        this._shedules = [
        ]
        this._selectedType = {} //null object
        this._selectedFormat = {}
        this._selectedCourse = {}
        this._selectedDocument = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    //Actionы
    // - любой блок кода, который может изменять такие данные (state): пользовательские события, внутренние данные и т.д.
    setTypes(types) {
        this._types = types
    }

    setFormats(formats) {
        this._formats = formats
    }

    setDocuments(documents) {
        this._documents = documents
    }

    setCourses(courses) {
        this._courses = courses
    }

    setCourse(course) {
        this._course = course
    }

    setSelectedType(type) {
        this._selectedType = type
        console.log(type)
    }

    setSelectedFormat(format) {
        this._selectedFormat = format
    }

    setSelectedDocument(document) {
        this._selectedDocument = document
    }

    setSelectedCourse(course) {
        this._selectedCourse = course
    }

    //создадим геттеры - для получения каких-то пременных из состояния
    //вызываются только в том случае, если перменная кя была внутри была изменена
    get types() {
        return this._types
    }

    get formats() {
        return this._formats
    }

    get courses() {
        return this._courses
    }

    get course() {
        return this._course
    }

    get documents() {
        return this._documents
    }

    get selectedType() {
        return this._selectedType
    }

    get selectedFormat() {
        return this._selectedFormat
    }

    get selectedDocument() {
        return this._selectedDocument
    }

    get selectedCourse() {
        return this._selectedCourse
    }
}