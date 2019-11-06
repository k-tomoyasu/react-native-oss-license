import Formatter from "./Formatter";
import SettingsBundle, { SettingBundlesDetailFormatter } from "./ios/SettingsBundle"
import LicenseToolsPlugin from "./android/LicenseToolsPlugin"
import Format from "../models/Format";
import AboutLibraries from "./android/AboutLibraries";
import FileWriter from "../writer/FileWriter";

export default class FormatterFactory {
    static create(opt: CmdOption): Formatter {
        switch(opt.format) {
            case Format.SettingsBunddle:
                const writer = new FileWriter();
                const detailFormatter = new SettingBundlesDetailFormatter(writer);
                return new SettingsBundle(opt, writer, detailFormatter);
            case Format.LicenseToolsPlugin:
                return new LicenseToolsPlugin(opt, new FileWriter());
            case Format.AboutLibraries:
                return new AboutLibraries(opt, new FileWriter());
            default: {
                throw new Error(`invalid format [${opt.format}] given. [${Format.getValidFormats()}] are valid.`);
            }    
        }
    }
}