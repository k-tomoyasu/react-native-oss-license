interface Writer {
  write(content: string, path?: string): Promise<void>
}
