import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'; // Import the JSON plugin

export default {
  input: 'src/includes/exchange.ts',
  output: {
    file: 'src/includes/currencies-exchange-rates.js',
    format: 'cjs',
    sourcemap: false
  },
  plugins: [
    json(),
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
  ],
};
