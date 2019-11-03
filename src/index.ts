import * as fs from "fs-extra";
import commander from "commander";

generate();

function generate() {
    const program = new commander.Command();
    program
        .version("0.0.1", "--version", "output current version")
        .parse(process.argv);
}
