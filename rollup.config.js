import babel from 'rollup-plugin-babel';

export default {
  entry: 'srcNestedTypes/index.js',
  format: 'es',
  dest: 'nestedtypes.js', // equivalent to --output
  plugins: [
    babel()
  ]
};
