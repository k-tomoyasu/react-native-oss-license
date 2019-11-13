import Format from '../models/Format'

export default function validateOption(
  cmdOpt: CmdOption
): [boolean, string | null] {
  if (cmdOpt.format && !Format.isSupportedFormat(cmdOpt.format)) {
    return [
      false,
      `invalid format name given. [${Format.getSupportedFormats()}] are supported.`
    ]
  } else if (!cmdOpt.format && !cmdOpt.outputJson) {
    return [
      false,
      `output format is not specified. use --format or --json option. "react-native-oss-license help" for detail.`
    ]
  }

  return [true, null]
}
