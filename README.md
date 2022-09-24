# react-native-oss-license

[![npm badge](https://badge.fury.io/js/react-native-oss-license.svg)](https://www.npmjs.com/package/react-native-oss-license)  
`react-native-oss-license` is **license list generator for React Native App(iOS & Android)**.  
It generates license lists of npm libraries for iOS, Android.  
This CLI tool allow you to easily generate content of oss-license.

## Installation

`npm i -g react-native-oss-license`

## [Sample App](https://github.com/k-tomoyasu/react-native-oss-license/tree/master/sample/)

## Usage

### iOS

Recommended to use with [LicensePlist](https://github.com/mono0926/LicensePlist) that scan cocoaopds, carthage.

#### [LicensePlist](https://github.com/mono0926/LicensePlist)

`react-native-oss-license` generate `plist` that you can locate to `Settings.bundle`.  
Run `react-native-oss-license --format settings-bundle` when your are in the directory that contains `package.json`
You can merge output `react-native-oss-license` and `LicensePlist`.

### Android

It is assumed to be used with other tools.

#### LicenseToolsPlugin

[License Tools Plugin for Android](https://github.com/cookpad/LicenseToolsPlugin) is Gradle plugin to check library licenses and generate license pages.  
Run `react-native-oss-license --format license-tools-plugin`.
It generate license list in YAML format.  
`react-native-oss-license` generate same format content. You can merge results.

#### AboutLibraries(under v8.9.4)

[AboutLibraries](https://github.com/mikepenz/AboutLibraries) provides fragment/activity that show license list.  
`react-native-oss-license` generate string resource xml `AboutLibraries` use.  
Run `react-native-oss-license --format about-libraries`, output strings.xml that you can put into `res/values/`.  
and output stdout `withLibraries("package_name_A", "package_name_B" ...)` that pass to method `withLibraries`.

#### AboutLibraries(over v10.0.0)

[AboutLibraries](https://github.com/mikepenz/AboutLibraries) provides Jetpack Compose that show license list.  
`react-native-oss-license` generate JSON files `AboutLibraries` use.  
Run `react-native-oss-license --format about-libraries-json`, output .json that you can put into `config`.  
`config/libraries` contains libraries json files.
`config/licenses` contains licenses json files.
You can specify any other directory instead of `config` with `--output-path` option.

### CLI

```sh
> cd {project-root}
> react-native-oss-license --help
Usage: react-native-oss-license [options]

Options:
  -f, --format <format>       output format. options:[settings-bundle,license-tools-plugin,about-libraries, about-libraries-json]
  --dev                       include devDependencies (default: false)
  --depth <depth>             dependencies depth (default: null)
  --output-path <outputPath>  specify path where output file
  --json                      output json to stdout (default: false)
  --add-version-number        write library version number (default: false)
  --only-direct-dependency    output only dependencies you write packages.json. (default: false)
  --skip-not-required         skip licenses those not require copyright notice (default: false)
  --bundle-id <bundleId>      unique id of your app.  It is used for output such as "plist" filename, etc. (default: null)
  --uses-plugin               whether AboutLibraries android plugin is used on native side as well (default: false)
  --version                   show current version
  -h, --help                  output usage information

> react-native-oss-license --format settings-bundle
output settings-bundle format to 'ios/com.k-tomoyasu.react-native-oss-license.Output'
```

## screen-shots

### iOS

![settings-bundle-list](screenshots/settings-bundle-list.png)
![settings-bundle-detail](screenshots/settings-bundle-detail.png)

### Android

#### license-tools-plugin

![license-tools-plugin](screenshots/license-tools-plugin.png)

#### AboutLibraries

![about-libraries](screenshots/about-libraries.png)

## Acknowledgment

This is based on [dart-oss-licenses](https://github.com/ko2ic/dart_oss_licenses) consepts.  
And referred [license-list](https://github.com/yami-beta/license-list).
