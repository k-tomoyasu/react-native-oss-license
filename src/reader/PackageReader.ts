import License from '../models/License'
import LicenseList from '../models/LicenseList'
import walkDependencies from './DependencyReader'
import fs from 'fs-extra'

const readInstalled = require('read-installed')

export default function readPackages(cmdOpt: CmdOption): Promise<License[]> {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))

  return new Promise<License[]>((resolve, reject) => {
    const inputPath = '.'
    readInstalled(
      inputPath,
      { dev: cmdOpt.includeDevDependencies, depth: cmdOpt.depth },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err: any, pkg: Package) => {
        if (err) {
          reject(err)
        }
        const licenseList = walkDependencies(
          pkg,
          new LicenseList({}),
          cmdOpt,
          Object.keys(packageJson.dependencies)
        )
        resolve(licenseList.getList())
      }
    )
  })
}
