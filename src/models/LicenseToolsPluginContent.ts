type LicenseToolsPluginContent = {
  readonly artifact: string
  readonly name: string
  readonly license: string
  readonly url: string | null
  readonly authors: string[]
  readonly forceGenerate: boolean
}
