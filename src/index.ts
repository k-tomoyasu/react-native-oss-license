import * as fs from "fs-extra";
import commander from "commander";
import glob from "glob";
import path from "path";
import License from "./models/License";
import LicenseList from "./models/LicenseList";
import FormatterFactory from "./formats/FormatterFactory";
import Format from "./models/Format";

const readInstalled = require("read-installed");

generate();

function generate():void {
    const program = new commander.Command();
    program
        .version("0.0.1", "--version", "show current version")
        .option("-f, --formats <formats>", "output formats")
        .option("--dev", "include devDependencies", false)
        .option("-p, --path <path>", "specify directory path where 'package.json' is located", ".")
        .option("--dev", "include devDependencies", false)
        .option("--depth <depth>", "dependencies depth", Infinity)
        .parse(process.argv);
    
    const cmdOpt: CmdOption = {
        rootPath: program.path, 
        includeDevDependencies: program.dev,
        depth: program.depth
    };

    getLicenses(cmdOpt).then(licenses => {
        Object.values(Format).forEach(format => {
            FormatterFactory
                .create(format)
                .format(licenses);
        });
    });
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
    if (pkg.extraneous) return licenseList;
    if (licenseList.exists(pkg.name, pkg.version)) return licenseList;

    const licenseFiles = glob.sync(path.join(pkg.path, '{LICENSE,License,license}*'));
    if (licenseFiles.length > 0) {
        pkg.licenseFile = fs.readFileSync(licenseFiles[0], 'utf8');
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
    return new License(
        pkg.name,
        pkg.version,
        pkg.license,
        pkg.licenseFile
    );
}