import License from "./License"

export default class LicenseList {
    private list: {[key:string]: License};

    constructor(list : {[key:string]: License}) {
        this.list = list;
    }

    exists(libraryName: string, version: string): boolean {
        return !!this.list[this.key(libraryName, version)];
    }

    add(license: License) {
        const key = this.key(license.libraryName, license.version);
        this.list[key] = license;
    }

    getList(): {[key:string]: License} {
        return this.list;
    }

    private key(libraryName: string, version: string): string {
        return libraryName + version;
    }
}