import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { globSync } from 'glob';
import path from 'path';
import alias from '@rollup/plugin-alias';
import replace from '@rollup/plugin-replace';
import { builtinModules } from 'module'; // Use ESM import for Node.js built-ins

const srcDir = 'src';
const distDir = 'build';

function getInputFiles(srcDir) {
  // Use glob to match all .ts files except .d.ts files
  const pattern = path.join(srcDir, '**/*.ts');
  return globSync(pattern, { ignore: '**/*.d.ts' });
}

export default {
  input: getInputFiles(srcDir),
  output: {
    dir: distDir,
    format: 'cjs',
    sourcemap: false,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    resolve({
      // extensions: ['.ts', '.js'],
      // //moduleDirectories: ['node_modules'],
      // preferBuiltins: true,
      // mainFields: ['module', 'main'],
    }),
    commonjs(),
    replace({
      delimiters: ['', ''],
      values: {
        'require("@includes/': 'require("./includes/'
      },
      preventAssignment: true
    }),
  ],
  external: id => {
    // Remove the check for currencies-exchange-rates to include it in the bundle
    if (/node_modules/.test(id) && id !== 'currencies-exchange-rates') {
      return true; // Mark other node_modules as external
    }
    return false; // Bundle everything else
  },
};
