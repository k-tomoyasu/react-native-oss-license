import Format from "../models/Format";

export default function validateOption(cmdOpt: CmdOption): [boolean, string | null] {
    if (cmdOpt.format && !Format.validFormatName(cmdOpt.format)) {
        return [false, `invalid format name given. [${Format.getValidFormats().toString()}] are supported.`];
    } else if (!cmdOpt.format && !cmdOpt.outputJson) {
        return [false, `output format is not specified. use --format or --json option.`];
    }

    return [true, null];
}