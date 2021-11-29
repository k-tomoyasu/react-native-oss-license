type FormatterOption = {
  readonly outputPath: string | null
  readonly addVersionNumber: boolean
}

type SettingsBundleOption = {
  readonly bundleId: string | null
} & FormatterOption
type AboutLibrariesOption = {} & FormatterOption
type LicenseToolsPluginOption = {} & FormatterOption
