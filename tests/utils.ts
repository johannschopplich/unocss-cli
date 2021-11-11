import { resolve } from 'pathe'
import fs from 'fs-extra'
import fg from 'fast-glob'
import execa from 'execa'

export const cacheDir = resolve(__dirname, '.cache')
export const bin = resolve(__dirname, '../bin/unocss.js')

// https://stackoverflow.com/questions/52788380/get-the-current-test-spec-name-in-jest
export const getTestName = () => expect.getState().currentTestName

export async function run(files: Record<string, string>) {
  const testDir = resolve(cacheDir, getTestName())

  // Retrieve any file's content
  const getFileContent = (filename: string) =>
    fs.readFile(resolve(testDir, filename), 'utf8')

  // Write entry files on disk
  await Promise.all(
    Object.entries(files).map(([path, content]) =>
      fs.outputFile(resolve(testDir, path), content, 'utf8')
    )
  )

  // Run unocss cli
  const { exitCode, stdout, stderr } = await execa(bin, ['site/**/*'], {
    cwd: testDir
  })

  const logs = stdout + stderr
  if (exitCode !== 0) {
    throw new Error(logs)
  }

  // Get main output and all associated files
  const output = await getFileContent('uno.css')
  const outFiles = await fg('**/*', { cwd: testDir, ignore: ['site'] })

  return {
    output,
    outFiles,
    logs,
    getFileContent
  }
}
