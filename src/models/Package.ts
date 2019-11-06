type Package = {
    readonly name: string,
    readonly version: string,
    readonly homepage?: string,
    readonly author?: Author,
    readonly repository?: Repository,
    readonly description?: string,
    readonly license: string | LicenseData,
    readonly path: string,
    readonly realPath: string,
    readonly depth: number,
    readonly dependencies?: { [key: string]: Package},
    readonly extraneous: boolean
    licenseContent?: string,
}

type Repository = {
    readonly url?: string,
    readonly type?: string
}

type Author = {
    readonly name?: string,
    readonly email?: string,
    readonly url?: string
}

type LicenseData = {
    type: string,
    url: string
}