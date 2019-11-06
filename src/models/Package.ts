type Package = {
    name: string,
    version: string,
    homepage?: string,
    author?: Author,
    repository?: Repository,
    description: string,
    license: string,
    licenseContent?: string,
    path: string,
    realPath: string,
    depth: number,
    dependencies?: { [key: string]: Package},
    extraneous: boolean
}

type Repository = {
    url?: string,
    type?: string
}

type Author = {
    name?: string,
    email?: string,
    url?: string
}