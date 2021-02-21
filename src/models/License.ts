export default class License {
  static noticeNotRequiredLicenses = ['0BSD', 'Public Domain', 'Unlicense']

  constructor(
    readonly libraryName: string,
    readonly version: string,
    readonly _license: string | LicenseData,
    private _description?: string,
    readonly homepage?: string,
    readonly author?: Author,
    readonly repository?: Repository,
    private _licenseContent?: string
  ) {}

  get description(): string {
    return this._description || ''
  }

  get license(): string | null {
    if (typeof this._license == 'string') {
      return this._license
    }
    if (typeof this._license == 'object') {
      return this._license.type
    }
    return null
  }

  get authorName(): string {
    return (this.author && this.author.name) || 'unknown'
  }

  get repositoryUrl(): string {
    return (this.repository && this.repository.url) || 'unknown'
  }

  get licenseContent(): string {
    if (this._licenseContent) {
      return this._licenseContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
    }
    return this.license || ''
  }

  get rawLicenseContent(): string {
    return this._licenseContent || this.license || ''
  }

  get requiresNotice(): boolean {
    const license = this.license
    if (!license) {
      return true
    }
    return !License.noticeNotRequiredLicenses.includes(license)
  }
}
