import type { MarkRequired } from 'ts-essentials'

export type Options = {
  patterns?: Array<string>
  outFile?: string
  watch?: boolean | string
}

export type NormalizedOptions = MarkRequired<Options, 'patterns'>
