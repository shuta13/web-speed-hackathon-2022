/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

function abs(...args) {
  return path.join(__dirname, ...args);
}

const SRC_ROOT = abs("./src");
const PUBLIC_ROOT = abs("./public");
const DIST_ROOT = abs("./dist");
const DIST_PUBLIC = abs("./dist/public");

const NODE_ENV = process.env.NODE_ENV;
const ANALYZE = process.env.ANALYZE;

/** @type {Array<import('webpack').Configuration>} */
module.exports = [
  {
    devtool: NODE_ENV === "production" ? false : "inline-source-map",
    entry: path.join(SRC_ROOT, "client/index.jsx"),
    mode: NODE_ENV,
    module: {
      rules: [
        {
          resourceQuery: (value) => {
            const query = new URLSearchParams(value);
            return query.has("raw");
          },
          type: "asset/source",
        },
        {
          exclude: /node_modules/,
          test: /\.jsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "auto",
                    spec: NODE_ENV !== "production",
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                [
                  "babel-plugin-styled-components",
                  {
                    pure: true,
                  },
                ],
              ],
            },
          },
        },
      ],
    },
    name: "client",
    output: {
      path: DIST_PUBLIC,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: PUBLIC_ROOT, to: DIST_PUBLIC }],
      }),
      ANALYZE === "true" ? new BundleAnalyzerPlugin() : () => {},
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    target: "web",
    // NOTE: Errors occured related TypeORM when mangling fname and classname.
    // ref. https://scrapbox.io/dojineko/TypeORM_%E3%81%A8_Webpack_%E3%82%92%E4%BD%B5%E7%94%A8%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88%E3%81%AE%E6%B3%A8%E6%84%8F%E7%82%B9
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true,
          },
        }),
      ],
    },
  },
  {
    devtool: NODE_ENV === "production" ? false : "inline-source-map",
    entry: path.join(SRC_ROOT, "server/index.js"),
    externals: [nodeExternals()],
    mode: NODE_ENV,
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /\.(js|mjs|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: "auto",
                    spec: NODE_ENV !== "production",
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    name: "server",
    output: {
      filename: "server.js",
      path: DIST_ROOT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".jsx"],
    },
    target: "node",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_fnames: true,
            keep_classnames: true,
          },
        }),
      ],
    },
  },
];
