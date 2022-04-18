import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import files from 'rollup-plugin-import-file';
import image from '@rollup/plugin-image';
import styles from 'rollup-plugin-styles';

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension';

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    // Replace environment variables
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      // Do not transpile dependencies
      ignore: ['node_modules'],
      babelHelpers: 'bundled',
    }),
    resolve({
      customResolveOptions: {
        moduleDirectories: ['src'],
      },
    }),
    commonjs(),
    image(),
    styles(),
    files({
      output: 'dist/audio',
      extensions: /\.wav$/,
      hash: false,
    }),
  ],
};
