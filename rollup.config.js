const typescript = require('@rollup/plugin-typescript')

/** @type {import('rollup').RollupOptions} */
module.exports = {
  input: 'src/index.ts',

  output: {
    sourcemap: true,
    format:    'cjs',

    dir: '.dist',
  },

  plugins: [
    typescript(),
  ],
}
