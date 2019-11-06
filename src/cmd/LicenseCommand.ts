import commander, { Command } from "commander"
import Format from "../models/Format";

export default class LicenseCommand {
    private program: Command
    constructor() {
        this.program = new commander.Command()
            .option("-f, --format <format>", `output format. options:[${Object.values(Format)}]`)
            .option("--dev", "include devDependencies", false)
            .option("--depth <depth>", "dependencies depth", Infinity)
            .option("--output-path <outputPath>", "specify path where output file")
            .option("--json", "output json to stdout", false)
            .version("0.0.1", "--version", "show current version");
    }

    parse(args : string[]): CmdOption {
        this.program.parse(args);
        return this.toCmdOption(this.program);
    } 

    private toCmdOption(command: Command): CmdOption {
        return {
            includeDevDependencies: command.dev,
            depth: command.depth,
            format: command.format || null,
            outputJson: command.json,
            outputPath: command.outputPath
        };
    }
}