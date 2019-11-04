import Formatter from "../Formatter";
import License from "../../models/License";

export default class SettingBundlesFormatter implements Formatter {
    format(licenses: License[]): void {
        console.log("SettingBundle");
    }
}