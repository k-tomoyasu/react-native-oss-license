import Formatter from "../Formatter";
import fs from "fs-extra";

export default class SettingBundlesFormatter implements Formatter {
    output(licenses: License[]): void {
        const baseName = "com.k-tomoyasu.react-native-oss-license";
        let licenseListOutput = '';
        licenses.forEach(license => {
            licenseListOutput += `
        <dict>
            <key>File</key>
            <string>${baseName}/${license.libraryName}</string>
            <key>Title</key>
            <string>${license.libraryName}</string>
            <key>Type</key>
            <string>PSChildPaneSpecifier</string>            
        </dict>`
            let  licenseContent = license.license;
            if (license.licenseContent) {
                licenseContent = license.licenseContent
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;");
            }
            const licenseOutput = 
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PreferenceSpecifiers</key>
    <array>
        <dict>
            <key>FooterText</key>
            <string>${licenseContent}</string>
            <key>Type</key>
            <string>PSGroupSpecifier</string>
        </dict>
    </array>
</dict>            
</plist>`

            fs.outputFile(`${baseName}.Output/${baseName}/${license.libraryName}.plist`, licenseOutput)
                .catch(err => console.error(err));
        });

        const plistOutput = 
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PreferenceSpecifiers</key>
    <array>
        <dict>
            <key>Title</key>
            <string>Licenses</string>
            <key>Type</key>
            <string>PSGroupSpecifier</string>
        </dict>
    ${licenseListOutput}    
    </array>
</dict>
</plist>`

        fs.outputFile(`${baseName}.Output/${baseName}.plist`, plistOutput)
                .catch(err => console.error(err));
        console.log("output SettingBundles");
    }
}