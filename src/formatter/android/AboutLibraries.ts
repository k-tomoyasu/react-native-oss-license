import he from 'he'

import Formatter from '../Formatter'
import License from '../../models/License'

export default class AboutLibraries implements Formatter {
  constructor(private opt: AboutLibrariesOption, private writer: Writer) {}

  output(licenses: License[]): void {
    const path =
      this.opt.outputPath ||
      'android/app/src/main/res/values/license_npm_libs_strings.xml'
    const prefix = this.opt.usesPlugin ? 'define_plu_' : 'define_int_'
    let licenseContent = ''

    const libraryNameList: string[] = []
    licenses.forEach(license => {
      const authorName = he.encode(license.authorName)
      const name = he.encode(license.libraryName)

      const libraryName = (this.opt.addVersionNumber
        ? `${license.libraryName}_${license.version}`
        : license.libraryName
      )
        .replace(/-/g, '_')
        .replace(/\./g, '_')
        .replace(/@/g, '')
        .replace(/\//g, '')
      libraryNameList.push(`"${libraryName}"`)

      const description = license.description
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      const libraryDetail = `
<!-- ${license.libraryName} -->
<string name="${prefix}${libraryName}">year;owner</string>
<string name="library_${libraryName}_author">"${authorName}"</string>
<string name="library_${libraryName}_libraryName">"${name}"</string>
<string name="library_${libraryName}_libraryVersion">${license.version}</string>
<string name="library_${libraryName}_libraryDescription">"${description}"</string>
<string name="library_${libraryName}_libraryWebsite">${license.homepage}</string>
<string name="library_${libraryName}_isOpenSource">true</string>
<string name="library_${libraryName}_repositoryLink">${license.repositoryUrl}</string>
<!-- Custom variables section -->
<string name="library_${libraryName}_year"></string>
<string name="library_${libraryName}_owner"></string>`

      licenseContent +=
        libraryDetail + this.getLicenseDetail(libraryName, license)
    })

    const resourceXml = `<?xml version="1.0" encoding="utf-8"?>
<!--suppress CheckTagEmptyBody -->
<resources>
    ${licenseContent}
</resources>`

    this.writer
      .write(path, resourceXml)
      .then(() =>
        console.log(
          `output about-libraries format to '${path}'.\nwithLibraries(${libraryNameList.join(
            ','
          )})`
        )
      )
      .catch(e => console.error(e))
  }

  private getLicenseDetail(libraryName: string, license: License): string {
    const licenseName = license.license || ''
    const installedLicense = !!(
      licenseName.match(/apache/i) ||
      licenseName.match(/bsd/i) ||
      licenseName.match(/mit/i)
    )
    if (installedLicense) {
      return `\n<string name="library_${libraryName}_licenseId">${licenseName}</string>`
    }
    return `
<string name="library_${libraryName}_licenseContent">"${license.licenseContent}"</string>
<string name="library_${libraryName}_licenseVersion">${licenseName}</string>
`
  }
}
