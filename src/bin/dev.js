const { build } = require('esbuild');
const sassPlugin = require('esbuild-plugin-sass');
const dotenv = require('dotenv');

dotenv.config();

build({
  define: {
    ...Object.fromEntries(
      Object.entries(process.env).map(([key, value]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ])
    ),
  },
  entryPoints: [
    'pages/custom.scss',
    'pages/PerfectGrill.js',
    'pages/ProductPage.js',
    'pages/ProductTypeCollection.js',
    'pages/SearchResult.js',
    'pages/WishlistContainer.js',
    'pages/OtherPage.js',
  ],
  bundle: true,
  watch: true,
  minify: false,
  sourcemap: 'inline',
  chunkNames: '[name]-[hash]',
  outdir: '../assets',
  target: ['es2020'],
  splitting: true,
  format: 'esm',
  plugins: [sassPlugin()],
}).catch(() => process.exit(1));
