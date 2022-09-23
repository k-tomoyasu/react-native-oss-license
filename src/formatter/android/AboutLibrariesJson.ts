import he from 'he'

import Formatter from '../Formatter'
import License from '../../models/License'

export default class AboutLibrariesJson implements Formatter {
  constructor(private opt: AboutLibrariesJsonOption, private writer: Writer) {}

  output(licenses: License[]): void {
    const configPath = this.opt.outputPath || 'android/config'
    const licensesPath = `${configPath}/licenses`
    const librariesPath = `${configPath}/libraries`

    const licenseIdentifiers: string[] = []
    licenses.forEach(license => {
      const authorName = license.authorName
      const name = license.libraryName
      const version = license.version
      const description = he.encode(license.description)
      const licenseName = license.license ? license.license : ''
      const libraryUniqueId = this.getLibraryUniqueId(license)
      const licenseUniqueId = this.getLicenseUniqueId(license)

      const libraryJson = {
        uniqueId: libraryUniqueId,
        developers: [authorName],
        artifactVersion: version,
        description,
        name,
        tag: '',
        licenses: [licenseUniqueId]
      }

      const libraryJsonPath = `${librariesPath}/${libraryUniqueId}.json`
      this.writer
        .write(libraryJsonPath, JSON.stringify(libraryJson))
        .then(() =>
          console.log(`output about-libraries format to '${libraryJsonPath}'.`)
        )
        .catch(e => console.error(e))

      if (
        licenseUniqueId != '' &&
        !licenseIdentifiers.includes(licenseUniqueId)
      ) {
        licenseIdentifiers.push(licenseUniqueId)
        const content = license.licenseContent
        const licenseJson = {
          content,
          hash: licenseUniqueId,
          url: '',
          name: licenseName
        }

        const licenseJsonPath = `${licensesPath}/${licenseUniqueId}.json`
        this.writer
          .write(licenseJsonPath, JSON.stringify(licenseJson))
          .then(() =>
            console.log(
              `output about-libraries format to '${licenseJsonPath}'.`
            )
          )
          .catch(e => console.error(e))
      }
    })
  }

  private getLibraryUniqueId(license: License): string {
    return license.libraryName.replace(' ', '_').replace('/', '_')
  }

  private getLicenseUniqueId(license: License): string {
    if (license.license == null) {
      return ''
    }
    const prefix = license.license.replace(' ', '_')
    if (license.licenseContent == '') {
      return prefix
    } else {
      return `${prefix}_${this.getLibraryUniqueId(license)}`
    }
  }
}
