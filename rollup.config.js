import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { globSync } from 'glob';
import path from 'path';

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
    format: 'esm',
    sourcemap: false,
    entryFileNames: '[name].js',
    chunkFileNames: '[name]-[hash].js',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    typescript({
      tsconfig: './tsconfig.json'
    }),
  ],
};
