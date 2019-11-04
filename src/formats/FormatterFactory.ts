import Formatter from "./Formatter";
import SettingsBundle from "./ios/SettingsBundle"
import LicenseToolsPlugin from "./android/LicenseToolsPlugin"
import Format from "../models/Format";

export default class FormatterFactory {
    static create(format: string): Formatter {
        switch(format) {
            case Format.SettingsBunddle:
                return new SettingsBundle();
            case Format.LicenseToolsPlugin:
                return new LicenseToolsPlugin();
            default: {
                const validFormats = Object.values(Format);
                throw new Error(`invalid format [${format}] given. [${validFormats}] are valid.`);
            }    
        }
    }
}