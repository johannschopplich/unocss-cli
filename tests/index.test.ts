import { remove } from 'fs-extra'
import { run, cacheDir } from './utils'

beforeAll(async () => {
  await remove(cacheDir)
})

it('builds uno.css', async () => {
  const { output, outFiles } = await run({
    'site/index.html': `<div class="p-4 max-w-screen-md"></div>`
  })

  expect(output).toMatchInlineSnapshot(`
    "/* generated by unocss-cli v0.2.0 */
    /* layer: default */
    .p-4{padding:1rem;}
    .max-w-screen-md{max-width:768px;}"
  `)

  expect(outFiles).toMatchInlineSnapshot(`
    Array [
      "uno.css",
    ]
  `)
})

it('supports unocss.config.js', async () => {
  const { output, outFiles } = await run({
    'site/index.html': `<div class="box"></div>`,
    'unocss.config.js': `
      import { defineConfig } from 'unocss'
      export default defineConfig({
        shortcuts: [{ box: 'max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4' }]
      })
    `
  })

  expect(output).toMatchInlineSnapshot(`
    "/* generated by unocss-cli v0.2.0 */
    /* layer: shortcuts */
    .box{padding:1rem;margin-left:auto;margin-right:auto;--un-bg-opacity:1;background-color:rgba(244,244,245,var(--un-bg-opacity));border-radius:0.375rem;--un-shadow-color:0,0,0;--un-shadow:0 1px 2px 0 rgba(var(--un-shadow-color), 0.05);-webkit-box-shadow:var(--un-ring-offset-shadow, 0 0 #0000), var(--un-ring-shadow, 0 0 #0000), var(--un-shadow);box-shadow:var(--un-ring-offset-shadow, 0 0 #0000), var(--un-ring-shadow, 0 0 #0000), var(--un-shadow);max-width:7xl;}"
  `)

  expect(outFiles).toMatchInlineSnapshot(`
    Array [
      "uno.css",
      "unocss.config.js",
    ]
  `)
})
