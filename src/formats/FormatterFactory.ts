import Formatter from "./Formatter";
import SettingsBundle from "./ios/SettingsBundle"
import LicenseToolsPlugin from "./android/LicenseToolsPlugin"
import Format from "../models/Format";
import AboutLibraries from "./android/AboutLibraries";

export default class FormatterFactory {
    static create(format: string): Formatter {
        switch(format) {
            case Format.SettingsBunddle:
                return new SettingsBundle();
            case Format.LicenseToolsPlugin:
                return new LicenseToolsPlugin();
            case Format.AboutLibraries:
                return new AboutLibraries();
            default: {
                const validFormats = Object.values(Format);
                throw new Error(`invalid format [${format}] given. [${validFormats}] are valid.`);
            }    
        }
    }
}