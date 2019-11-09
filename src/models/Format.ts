enum Format {
    SettingsBunddle = "settings-bundle",
    LicenseToolsPlugin = "license-tools-plugin",
    AboutLibraries = "about-libraries"
}

namespace Format {
    export function isSupportedFormat(formatName: string): boolean {
        return getSupportedFormats().indexOf(formatName) >= 0;
    }

    export function getSupportedFormats(): string[] {
        return Object.values(Format).filter(prop => typeof prop != "function") as string[];
    }
}

export default Format;