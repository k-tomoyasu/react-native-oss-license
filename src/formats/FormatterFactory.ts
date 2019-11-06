import Formatter from "./Formatter";
import SettingsBundle from "./ios/SettingsBundle"
import LicenseToolsPlugin from "./android/LicenseToolsPlugin"
import Format from "../models/Format";
import AboutLibraries from "./android/AboutLibraries";

export default class FormatterFactory {
    static create(opt: CmdOption): Formatter {
        switch(opt.format) {
            case Format.SettingsBunddle:
                return new SettingsBundle(opt);
            case Format.LicenseToolsPlugin:
                return new LicenseToolsPlugin(opt);
            case Format.AboutLibraries:
                return new AboutLibraries(opt);
            default: {
                throw new Error(`invalid format [${opt.format}] given. [${Format.getValidFormats()}] are valid.`);
            }    
        }
    }
}