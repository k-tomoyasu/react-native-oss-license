/* eslint-disable no-inner-declarations */
enum Format {
  SettingsBunddle = 'settings-bundle',
  LicenseToolsPlugin = 'license-tools-plugin',
  AboutLibraries = 'about-libraries',
  AboutLibrariesJson = 'about-libraries-json'
}

namespace Format {
  export function getSupportedFormats(): string[] {
    return Object.values(Format).filter(
      prop => typeof prop != 'function'
    ) as string[]
  }

  export function isSupportedFormat(formatName: string): boolean {
    return getSupportedFormats().indexOf(formatName) >= 0
  }
}

export default Format
