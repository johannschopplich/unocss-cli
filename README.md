# unocss-cli

The missing CLI for the instant on-demand Atomic CSS engine. Perfect fit for your traditional backends.

> Make sure to check out the [UnoCSS](https://github.com/antfu/unocss) repository for all details on UnoCSS.

## Key Features

- 🍱 Suited for traditional backends like Laravel or Kirby
- 👀 [Watch mode](#watch) included
- 🔌 Supports custom configurations via [`unocss.config.js`](#unocssconfigjs-support)

## Requirements

- Node 14+ (Node 16 recommended)

## Installation

If you want to use `unocss-cli` right away, simply call it with `npx`:

```bash
npx unocss-cli "site/{snippets,templates}/**/*.php"
```

Or install it with a package manager of your choice:

```bash
npm i unocss-cli -D # or pnpm i unocss-cli -D
```

Example package configuration:

```json
{
  "scripts": {
    "dev": "unocss-cli \"site/{snippets,templates}/**/*.php\" --watch",
    "build": "unocss-cli \"site/{snippets,templates}/**/*.php\""
  },
  "devDependencies": {
    "unocss-cli": "^0.1.0"
  }
}
```

Global installation is supported as well, but not recommended.

## Usage

You can also pass multiple glob patterns to `unocss-cli`:

```bash
npx unocss-cli "site/snippets/**/*.php" "site/templates/**/*.php"
```

> ℹ️ Make sure to add quotes to your glob patterns to let the script handle parsing.

### Development

Add the `--watch` (or `-w`) flag to enable watching for file changes:

```bash
unocss-cli --watch "site/{snippets,templates}/**/*.php"
```

### Production

```bash
unocss-cli "site/{snippets,templates}/**/*.php"
```

The final `uno.css` will be generated to the current directory by default.

## Built-in Features

### `unocss.config.js` Support

You can create a `unocss.config.js` (or `.cjs`) configuration file the root-level of your project. ESM is not supported, you will have to use CJS.

```js
/** @type {import('@unocss/vite').UnocssPluginOptions} */
module.exports = {
  shortcuts: [
    { 'box': 'max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4' }
  ]
}
```

For a list of options, head over to the [UnoCSS configurations](https://github.com/antfu/unocss#configurations) docs.

## Options

> Inspect all available options with `unocss-cli --help`.

### `--out-file`

The output filename for the generated UnoCSS file. Defaults to `uno.css` in the current working directory.

### `--watch`

Indicates if the files found by the glob pattern should be watched.

## Credits

- [Anthony Fu](https://antfu.me) for his inspirational work on [UnoCSS](https://github.com/antfu/unocss).

## License

MIT
