export default class License {
    libraryName: string;
    version: string;
    license: string;
    licenseFile?: string;

    constructor(
        libraryName: string,
        version: string,
        license: string,
        licenseFile?: string,
    ) {
        this.libraryName = libraryName;
        this.version = version;
        this.license = license;
        this.licenseFile = licenseFile;
    }
}