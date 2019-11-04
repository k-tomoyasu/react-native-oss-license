import * as fs from "fs-extra";
import commander from "commander";
import glob from "glob";
import path from "path";
import LicenseList from "./models/LicenseList";
import FormatterFactory from "./formats/FormatterFactory";
import Format from "./models/Format";

const readInstalled = require("read-installed");

generate();

function generate():void {
    const program = new commander.Command();
    program
        .version("0.0.1", "--version", "show current version")
        .option("-f, --format <format>", `output format. options:[${Object.values(Format)}]`)
        .option("--dev", "include devDependencies", false)
        .option("-p, --path <path>", "specify directory path where 'package.json' is located", ".")
        .option("--depth <depth>", "dependencies depth", Infinity)
        .option("--json", "output json to stdout", false)
        .parse(process.argv);
    
    const cmdOpt: CmdOption = {
        rootPath: program.path, 
        includeDevDependencies: program.dev,
        depth: program.depth,
        format: program.format || null,
        outputJson: program.json
    };

    getLicenses(cmdOpt).then(licenses => {
        if(cmdOpt.outputJson) {
            console.log(JSON.stringify(licenses));
            return;
        }

        if (cmdOpt.format) {
            FormatterFactory
                .create(cmdOpt.format)
                .format(licenses);
            return;
        }

        Object.values(Format).forEach(format => {
            FormatterFactory
                .create(format)
                .format(licenses);
        });
    }).catch(err => console.error(err));
}

function getLicenses(cmdOpt: CmdOption): Promise<License[]> {
    return new Promise<License[]>((resolve, reject) => {
        readInstalled(
            cmdOpt.rootPath, 
            {dev: cmdOpt.includeDevDependencies, depth: cmdOpt.depth}, 
            (err: any, pkg: Package) => {
                if (err) {
                    reject(err);
                }
                const licenseList = readDependencies(pkg, new LicenseList({}), cmdOpt);
                resolve(licenseList.getList());
            });
    })
}

function readDependencies(pkg: Package, licenseList: LicenseList, opt: CmdOption): LicenseList {
    if (pkg.extraneous || licenseList.exists(pkg.name, pkg.version)) {
        return licenseList;
    }

    const licenseFiles = glob.sync(path.join(pkg.path, '{LICENSE,License,license}*'));
    if (licenseFiles.length > 0) {
        pkg.licenseContent = fs.readFileSync(licenseFiles[0], 'utf8');
    }
    licenseList.add(pkgToLicense(pkg));

    Object.keys(pkg.dependencies).forEach(objKey => {
        if (!pkg.dependencies) return;
        const dep = pkg.dependencies[objKey]
        licenseList = readDependencies(dep, licenseList, opt);
    });
    return licenseList;
}

function pkgToLicense(pkg: Package): License {
    return {
        libraryName: pkg.name,
        version: pkg.version,
        license: pkg.license,
        licenseContent: pkg.licenseContent
    };
}