type FormatterOption = {
  readonly outputPath: string | null
  readonly addVersionNumber: boolean
}

type SettingsBundleOption = {
  readonly bundleId: string | null
} & FormatterOption
type AboutLibrariesOption = {
  /**
   * Whether the native plugin is also used to generate native dependencies.
   */
  usesPlugin: boolean
} & FormatterOption
type AboutLibrariesJsonOption = {} & FormatterOption
type LicenseToolsPluginOption = {} & FormatterOption
