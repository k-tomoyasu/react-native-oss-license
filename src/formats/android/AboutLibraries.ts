import Formatter from "../Formatter";
import License from "../../models/License";

export default class AboutLicensesFormatter implements Formatter {
    format(licenses: License[]): void {
        console.log("AboutLibralies");
    }
}