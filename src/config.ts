import { defineConfig, presetAttributify, presetUno } from 'unocss'

export const defaultConfig = defineConfig({
  envMode: 'build',
  presets: [presetAttributify({ strict: true }), presetUno()]
})
