type CmdOption = {
  readonly includeDevDependencies: boolean
  readonly depth: number
  readonly format: string | null
  readonly outputJson: boolean
  readonly outputPath: string | null
  readonly addVersionNumber: boolean
  readonly onlyDirectDependency: boolean
}
