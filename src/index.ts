import * as fs from "fs-extra";
import commander, { Command } from "commander";
import FormatterFactory from "./formats/FormatterFactory";
import Format from "./models/Format";
import readPackages from "./reader/PackageReader";
import validateOption from "./cmd/CommandValidator";
import { toCmdOption } from "./models/CmdOption";

generate();

function generate():void {
    const program = new commander.Command();
    program
        .option("-f, --format <format>", `output format. options:[${Object.values(Format)}]`)
        .option("--dev", "include devDependencies", false)
        .option("--depth <depth>", "dependencies depth", Infinity)
        .option("--output-path <outputPath>", "specify path where output file")
        .option("--json", "output json to stdout", false)
        .version("0.0.1", "--version", "show current version")
        .parse(process.argv);
    
    if (!fs.pathExistsSync("package.json")) {
        console.error("'package.json' is not exists in current dir.")
        return;
    }
    const cmdOpt = toCmdOption(program);
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