type FormatterOption = {
  readonly outputPath: string | null
  readonly addVersionNumber: boolean
}

type SettingsBundleOption = {} & FormatterOption
type AboutLibrariesOption = {} & FormatterOption
type LicenseToolsPluginOption = {} & FormatterOption
