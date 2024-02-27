import { makeAutoObservable } from "mobx";

export default class LicenseStore {
    //работа с mobx
    constructor() {
        this._licenses = [
        ]

        this._selectedLicense = {}
        makeAutoObservable(this) //теперь mobx будет следить за изм этих переменных
    }

    setLicenses(licenses) {
        this._licenses = licenses
    }

    setSelectedLicense(license) {
        this._selectedLicense = license
    }

    get licenses() {
        return this._licenses
    }

    get selectedLicense() {
        return this._selectedLicense
    }
}