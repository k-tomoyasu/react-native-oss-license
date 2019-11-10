import fs from 'fs-extra'

export default class FileWriter implements Writer {
  write(content: string, path: string): Promise<void> {
    return fs.outputFile(content, path)
  }
}
