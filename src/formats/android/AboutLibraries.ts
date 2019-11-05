import Formatter from "../Formatter";
import License from "../../models/License";
import YAML from "yaml";
import fs from "fs-extra";

export default class AboutLibraries implements Formatter {
    output(licenses: License[]): void {
        const path = "android/app/src/main/res/values/license_strings.xml"
        let list = "";
        licenses.forEach(license => {
            const libraryName = (license.libraryName + "_" + license.version)
                .replace(/-/g, "_")
                .replace(/\./g, "_")
                .replace(/@/g, "")
                .replace(/\//g, "");
            const description = license.description
                .replace(/'/g, "\\'")
                .replace(/"/g, '\\"')
                .replace(/&/g, "&amp;");
            const detail = `
<!-- ${license.libraryName} -->
<string name="define_int_${libraryName}">year;owner</string>
<string name="library_${libraryName}_author">${license.authorName}</string>
<string name="library_${libraryName}_libraryName">${license.libraryName}</string>
<string name="library_${libraryName}_libraryDescription">${description}</string>
<string name="library_${libraryName}_libraryWebsite">${license.homepage}</string>
<string name="library_${libraryName}_isOpenSource">true</string>
<string name="library_${libraryName}_repositoryLink">${license.repositoryUrl}</string>
<string name="library_${libraryName}_licenseId">${license.license}</string>
<!-- Custom variables section -->
<string name="library_${libraryName}_year"></string>
<string name="library_${libraryName}_owner"></string>`;
            list += detail;
        });
        const content = 
`<?xml version="1.0" encoding="utf-8"?>
<resources>
    ${list}
</resources>`;

        fs.outputFile(path, content)
            .then(_ => console.log(`output about-libraries format to '${path}'`))
            .catch(e => console.error(e));
    }
}