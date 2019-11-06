import License from "../models/License";
import LicenseList from "../models/LicenseList";
import walkDependencies from "./DependencyReader";

const readInstalled = require("read-installed");

export default function readPackages(cmdOpt: CmdOption): Promise<License[]> {
    return new Promise<License[]>((resolve, reject) => {
        const inputPath = ".";
        readInstalled(
            inputPath,
            {dev: cmdOpt.includeDevDependencies, depth: cmdOpt.depth}, 
            (err: any, pkg: Package) => {
                if (err) {
                    reject(err);
                }
                const licenseList = walkDependencies(pkg, new LicenseList({}), cmdOpt);
                resolve(licenseList.getList());
            }
        );
    })
}