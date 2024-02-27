import { makeAutoObservable } from "mobx";

export default class CourseStore {
    //работа с mobx
    constructor() {
        this._courses = [
        ]
        this._shedules = [
        ]

        this._requests = [
        ]

        this._selectedLicense = {}
        this._selectedCourse = {}
        this._selectedShedule = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    setCourses(courses) {
        this._courses = courses
    }

    setShedules(shedules) {
        this._shedules = shedules
    }

    setSelectedCourse(course) {
        this._selectedCourse = course
    }

    setSelectedShedule(shedule) {
        this._selectedShedule = shedule
    }

    setRequests(requests) {
        this._requests = requests
    }

    setSelectedRequest(request) {
        this._selectedRequest = request
    }

    get requests() {
        return this._requests
    }

    get selectedRequest() {
        return this._selectedRequest
    }

    get courses() {
        return this._courses
    }

    get shedules() {
        return this._shedules
    }

    get selectedCourse() {
        return this._selectedCourse
    }

    get selectedShedule() {
        return this._selectedShedule
    }
}