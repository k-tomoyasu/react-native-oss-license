import * as fs from "fs-extra";
import commander from "commander";
import glob from "glob";
import path from "path";
import LicenseList from "./models/LicenseList";
import FormatterFactory from "./formats/FormatterFactory";
import Format from "./models/Format";
import License from "./models/License";

const readInstalled = require("read-installed");

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
    const cmdOpt: CmdOption = {
        includeDevDependencies: program.dev,
        depth: program.depth,
        format: program.format || null,
        outputJson: program.json,
        outputPath: program.outputPath
    };

    if (!cmdOpt.format && !cmdOpt.outputJson) {
        console.error("no format specified. use --format option.")
        return;
    }
    getLicenses(cmdOpt).then(licenses => {
        if(cmdOpt.outputJson) {
            console.log(JSON.stringify(licenses));
            return;
        }
        FormatterFactory
            .create(cmdOpt)
            .output(licenses);
        return;
    }).catch(err => console.error(err));
}

function getLicenses(cmdOpt: CmdOption): Promise<License[]> {
    return new Promise<License[]>((resolve, reject) => {
        readInstalled(
            ".",
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
    return new License(
        pkg.name,
        pkg.version,
        pkg.description,
        pkg.license,
        pkg.homepage,
        pkg.author,
        pkg.repository,
        pkg.licenseContent,
    );
}