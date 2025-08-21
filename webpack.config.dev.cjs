const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")


/** @type {import('webpack').Configuration} */
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, "src/index.tsx"),
    devtool: "eval-cheap-module-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "assets/[name].js",
        assetModuleFilename: "assets/[hash][ext][query]",
        publicPath: "/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {"@": path.resolve(__dirname, "src")}
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: {
                    loader: "swc-loader",
                    options: {
                        jsc: {
                            parser: {syntax: "typescript", tsx: true},
                            target: "es2020",
                            transform: {react: {runtime: "automatic", refresh: true}}
                        }
                    }
                },
                exclude: /node_module/
            },
            {
                test: /\.css$/,
                use: ["style-loader", {loader: "css-loader", options: {importLoader: 1}}, "postcss-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|woff2?|ttf|eot)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname,"public/index.html"), favicon: false}),
        new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        client: {overlay: true}
    }
}