export default class License {
    constructor(
        readonly libraryName: string,
        readonly version: string,
        readonly license: string,
        private _licenseContent?: string
    ){}

    get licenseContent(): string {
        if (this._licenseContent) {
            return this._licenseContent
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
        }
        return this.license
    }

    get rawLicenseContent(): string {
        return this._licenseContent || this.license
    }
}