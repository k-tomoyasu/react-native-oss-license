import Formatter from "../Formatter";
import License from "../../models/License";

const baseName = "com.k-tomoyasu.react-native-oss-license";

export default class SettingBundlesFormatter implements Formatter {

    constructor(private opt: SettingsBundleOption, private writer: Writer, private detailFormatter: SettingBundlesDetailFormatter) {}
    
    output(licenses: License[]): void {
        const basePath = this.opt.outputPath || `ios/${baseName}.Output`;
        let licenseListContent = this.detailFormatter.outputDetail(licenses, basePath);
        const plist = 
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
    ${licenseListContent}    
    </array>
</dict>
</plist>`

        this.writer.write(`${basePath}/${baseName}.plist`, plist)
            .then(_ => console.log(`output settings-bundle format to '${basePath}'`))
            .catch(err => console.error(err));
    }
}

export class SettingBundlesDetailFormatter {
    constructor(private writer: Writer) {}
    outputDetail(licenses: License[], basePath: string): string {
        let licenseListContent = '';
        licenses.forEach(license => {
            licenseListContent += `
        <dict>
            <key>File</key>
            <string>${baseName}/${license.libraryName}</string>
            <key>Title</key>
            <string>${license.libraryName}</string>
            <key>Type</key>
            <string>PSChildPaneSpecifier</string>            
        </dict>`
            const detailPlist = 
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PreferenceSpecifiers</key>
    <array>
        <dict>
            <key>FooterText</key>
            <string>${license.licenseContent}</string>
            <key>Type</key>
            <string>PSGroupSpecifier</string>
        </dict>
    </array>
</dict>            
</plist>`

            this.writer.write(`${basePath}/${baseName}/${license.libraryName}.plist`, detailPlist)
                .catch(err => console.error(err));
        });

        return licenseListContent;
    }
}