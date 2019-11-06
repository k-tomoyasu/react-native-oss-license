import * as fs from "fs-extra";
import FormatterFactory from "./formatter/FormatterFactory";
import readPackages from "./reader/PackageReader";
import validateOption from "./cmd/CommandValidator";
import LicenseCommand from "./cmd/LicenseCommand";
import commander = require("commander");

generate();

function generate():void {
    if (!fs.pathExistsSync("package.json")) {
        console.error("'package.json' is not exists in current dir.")
        return;
    }
    const command = new LicenseCommand(new commander.Command());
    const cmdOpt = command.parse(process.argv);

    const [validOpt, messge] = validateOption(cmdOpt);
    if (!validOpt) {
        console.error(messge);
        return;
    };

    readPackages(cmdOpt).then(licenses => {
        if(cmdOpt.outputJson) {
            console.log(JSON.stringify(licenses));
            return;
        }
        FormatterFactory
            .create(cmdOpt)
            .output(licenses);
    }).catch(err => console.error(err));
}