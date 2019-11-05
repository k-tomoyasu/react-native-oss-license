export default class License {
    constructor(
        readonly libraryName: string,
        readonly version: string,
        readonly description: string,
        readonly license: string,
        readonly homepage?: string,
        readonly author?: Author,
        readonly repository?: Repository,
        private _licenseContent?: string
    ){}

    get authorName(): string {
        return this.author && this.author.name || "unknown";
    }

    get repositoryUrl(): string {
        return this.repository && this.repository.url || "unknown";
    }

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