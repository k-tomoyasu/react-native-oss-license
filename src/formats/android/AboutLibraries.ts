import Formatter from "../Formatter";
import License from "../../models/License";
import fs from "fs-extra";

export default class AboutLicenses implements Formatter {
    output(licenses: License[]): void {
        const path = "android/app/src/main/res/values/license_npm_libs_strings.xml"
        let licenseContent = "";
        let libraryNameList: string[] = [];
        licenses.forEach(license => {
            const libraryName = (license.libraryName + "_" + license.version)
                .replace(/-/g, "_")
                .replace(/\./g, "_")
                .replace(/@/g, "")
                .replace(/\//g, "");
            libraryNameList.push(`"${libraryName}"`);

            const description = license.description
                .replace(/'/g, "\\'")
                .replace(/"/g, '\\"')
                .replace(/&/g, "&amp;");
            const libraryDetail = `
<!-- ${license.libraryName} -->
<string name="define_int_${libraryName}">year;owner</string>
<string name="library_${libraryName}_author">${license.authorName}</string>
<string name="library_${libraryName}_libraryName">${license.libraryName}</string>
<string name="library_${libraryName}_libraryVersion">${license.version}</string>
<string name="library_${libraryName}_libraryDescription">${description}</string>
<string name="library_${libraryName}_libraryWebsite">${license.homepage}</string>
<string name="library_${libraryName}_isOpenSource">true</string>
<string name="library_${libraryName}_repositoryLink">${license.repositoryUrl}</string>
<!-- Custom variables section -->
<string name="library_${libraryName}_year"></string>
<string name="library_${libraryName}_owner"></string>`;
            
            licenseContent += libraryDetail + this.getLicenseDetail(libraryName, license);
        });

        const content = 
`<?xml version="1.0" encoding="utf-8"?>
<resources>
    ${licenseContent}
</resources>`;

        fs.outputFile(path, content)
            .then(_ => console.log(`output about-libraries format to '${path}'.\nwithLibraries(${libraryNameList.join(",")})`))
            .catch(e => console.error(e));
    }

    private getLicenseDetail(libraryName: string, license: License): string {
        const installedLicense = !!(license.license.match(/apache/i) || license.license.match(/bsd/i) || license.license.match(/mit/i));
        if (installedLicense) {
            return `\n<string name="library_${libraryName}_licenseId">${license.license}</string>`
        }
        return `
<string name="library_${libraryName}_licenseContent">${license.licenseContent}</string>
<string name="library_${libraryName}_licenseVersion">${license.license}</string>
`
    }

}