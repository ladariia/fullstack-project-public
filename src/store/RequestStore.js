import { makeAutoObservable } from "mobx";

export default class RequestStore {
    //работа с mobx
    constructor() {
        this._requests = [
        ]

        this._selectedLicense = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
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
}