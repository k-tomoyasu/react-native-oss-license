import fs from "fs-extra";
import glob from "glob";
import path from "path";
import LicenseList from "../models/LicenseList";
import License from "../models/License";

export default function walkDependencies(pkg: Package, licenseList: LicenseList, opt: CmdOption): LicenseList {
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
        licenseList = walkDependencies(dep, licenseList, opt);
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