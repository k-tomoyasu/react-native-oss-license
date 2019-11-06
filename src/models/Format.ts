enum Format {
    SettingsBunddle = "settings-bundle",
    LicenseToolsPlugin = "license-tools-plugin",
    AboutLibraries = "about-libraries"
}

namespace Format {
    export function validFormatName(formatName: string): boolean {
        const validFormatNames = getValidFormats();
        return validFormatNames.indexOf(formatName) > 0;
    }
    export function getValidFormats():string[] {
        return Object.values(Format) as string[];
    }
}

export default Format;