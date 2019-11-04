import Formatter from "../Formatter";

export default class SettingBundlesFormatter implements Formatter {
    format(licenses: License[]): void {
        console.log("SettingBundle");
    }
}