import License from "../models/License";

export default interface Formatter {
    output(licenses: License[]): void
}