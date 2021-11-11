import { defineConfig, presetUno } from 'unocss'

export const defaultConfig = defineConfig({
  envMode: 'build',
  presets: [presetUno()]
})
