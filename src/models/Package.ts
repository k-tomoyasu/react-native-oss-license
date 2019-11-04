type Package = {
    name: string,
    version: string,
    depth: number,
    license: string,
    licenseFile?: string,
    path: string,
    dependencies: { [key: string]: Package},
    extraneous: boolean
}