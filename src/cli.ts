#!/usr/bin/env node

import { cac } from 'cac'
import { build } from './index'
import { name, version } from '../package.json'
import { handleError } from './errors'
import type { Options } from './types'

async function main(options: Options = {}) {
  const cli = cac(name)

  cli
    .command('[...patterns]', 'Glob patterns', {
      ignoreOptionDefaultValue: true
    })
    .option('-o, --out-file <file>', 'Output file', {
      default: process.cwd()
    })
    .option('-w, --watch', 'Watch for file changes')
    .action(async (patterns: Array<string>, flags) => {
      Object.assign(options, {
        ...flags
      })

      if (patterns) {
        options.patterns = patterns
      }

      await build(options)
    })

  cli.help()

  cli.version(version)

  // Parse CLI args without running the command to
  // handle command errors globally
  cli.parse(process.argv, { run: false })
  await cli.runMatchedCommand()
}

main().catch(handleError)
