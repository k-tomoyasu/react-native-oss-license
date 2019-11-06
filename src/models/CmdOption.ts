import { Command } from "commander";

export type CmdOption = {
    includeDevDependencies: boolean,
    depth: number,
    format: string | null,
    outputJson: boolean,
    outputPath: string | null
}

export function toCmdOption(command: Command): CmdOption {
    return {
        includeDevDependencies: command.dev,
        depth: command.depth,
        format: command.format || null,
        outputJson: command.json,
        outputPath: command.outputPath
    };
}