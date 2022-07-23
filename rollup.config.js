import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  input: `src/${pkg.name}.ts`,
  output: {
    file: `dist/${pkg.name}.js`,
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' })]
};
