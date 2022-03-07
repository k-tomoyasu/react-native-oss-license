import License from './License'

export default class LicenseList {
  constructor(
    private list: { [key: string]: License },
    private cmdOpt: CmdOption
  ) {}

  exists(libraryName: string, version: string): boolean {
    return !!this.list[this.key(libraryName, version)]
  }

  add(license: License): void {
    const key = this.key(license.libraryName, license.version)
    this.list[key] = license
  }

  getList(): License[] {
    return Object.values(this.list)
  }

  getUniqueList(): License[] {
    const unique: Record<string, number> = {}
    const distinct: License[] = []
    const licenses = this.getList()

    for (let i = 0; i < licenses.length; i++) {
      const libraryName = licenses[i].libraryName.replace(/[^\w\s]/gi, '')
      if (!unique[libraryName]) {
        distinct.push(licenses[i])
        unique[libraryName] = 1
      }
    }

    return distinct
  }

  private key(libraryName: string, version: string): string {
    if (this.cmdOpt.addVersionNumber) {
      return libraryName + version
    }
    return libraryName
  }
}
