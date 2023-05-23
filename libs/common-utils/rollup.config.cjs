const path = require('path')
const typescript = require('@rollup/plugin-typescript')
const pkg = require('./package.json')

const resolve = (_path) => path.resolve(__dirname, _path)

const outputList = [
  {
    file: pkg.main,
    format: 'cjs',
    sourcemap: true
  },
  {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }
]

module.exports = outputList.map((outputData) => {
  const output = {
    file: outputData.file,
    format: outputData.format,
    sourcemap: outputData.sourcemap
  }
  if (outputData.name) output.name = outputData.name

  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  }
})
