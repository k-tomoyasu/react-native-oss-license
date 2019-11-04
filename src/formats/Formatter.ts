import License from "../models/License";

export default interface Formatter {
    format(licenses: License[]): void
}