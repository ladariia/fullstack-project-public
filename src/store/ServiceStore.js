import { makeAutoObservable } from "mobx";

export default class ServiceStore {
    //работа с mobx
    constructor() {
        this._types = [

        ]
        this._services = [
        ]

        this._selectedType = {} //null object
        this._selectedService = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    setTypes(types) {
        this._types = types
    }
    setServices(services) {
        this._services = services
    }

    setSelectedType(type) {
        this._selectedType = type
        console.log(type)
    }
    setSelectedService(service) {
        this._selectedService = service
    }

    get types() {
        return this._types
    }
    get services() {
        return this._services
    }

    get selectedType() {
        return this._selectedType
    }
    get selectedService() {
        return this._selectedService
    }
}