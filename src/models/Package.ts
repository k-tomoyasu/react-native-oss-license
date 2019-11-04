type Package = {
    name: string,
    version: string,
    depth: number,
    license: string,
    licenseContent?: string,
    path: string,
    dependencies: { [key: string]: Package},
    extraneous: boolean
}