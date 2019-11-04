import Formatter from "../Formatter";

export default class AboutLicensesFormatter implements Formatter {
    output(licenses: License[]): void {
        console.log("AboutLibralies");
    }
}