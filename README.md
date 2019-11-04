# react-native-oss-license
`react-native-oss-license` is **license generator for React Native App(iOS & Android)**.
This CLI tool allow you to easily generate content of oss-license.

## Usage
### iOS
`react-native-oss-license` generate `plist` that you can locate to `Settings.bundle`.
Recommended to use with [LicensePlist](https://github.com/mono0926/LicensePlist) that scan cocoaopds, carthage.
You can merge output `react-native-oss-license` and `LicensePlist`.

### Android
It is assumed to be used with other tools.

#### license-tools-plugin
[license-tools-plugin](https://github.com/cookpad/license-tools-plugin) is Gradle plugin to check library licenses and generate license pages.  
It generate license list in YAML format.  
`react-native-oss-license` generate same format content. You can merge results.

### CLI
```sh
> cd {project-root}
> react-native-oss-license --help
Usage: react-native-oss-license [options]

Options:
  -f, --format <format>  output format. options:[settings-undle,license-tools-plugin]
  --dev                  include devDependencies (default: false)
  --depth <depth>        dependencies depth (default: null)
  --json                 output json to stdout (default: false)
  --version              show current version
  -h, --help             output usage information

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