import Formatter from "../Formatter";
import License from "../../models/License";
import YAML from "yaml";
import fs from "fs-extra";

export default class LicenseToolsPluginFormatter implements Formatter {

    constructor(private opt: LicenseToolsPluginOption, private writer: Writer) {}

    output(licenses: License[]): void {
        const path = this.opt.outputPath || "android/app/licenses-npm.yml";
        let yamlContent: LicenseToolsPluginContent[] = [];
        licenses.forEach(license => {
            const elm: LicenseToolsPluginContent = {
                artifact: `npm:${license.libraryName}:${license.version}`,
                name: license.libraryName,
                license: license.license,
                url: license.homepage || '',
                authors: [license.author && license.author.name || "unknown"],
                forceGenerate: true
            };
            yamlContent.push(elm);
        });

        this.writer.write(path, "#npm-libraries\n" + YAML.stringify(yamlContent))
            .then(_ => console.log(`output license-tools-plugin format to '${path}'`))
            .catch(e => console.error(e));
    }
}