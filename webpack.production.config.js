const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv").config({ path: __dirname + "/.env" });

module.exports = () => {
    return {
        entry: "./index.tsx",
        mode: "production",
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        target: "web",
        devServer: {
            port: "5000",
            static: {
                directory: path.join(__dirname, "public"),
            },
            open: true,
            hot: true,
            liveReload: true,
        },
        resolve: {
            extensions: [
                ".js",
                ".jsx",
                ".json",
                ".tsx",
                ".ts",
                ".scss",
                ".css",
            ],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: "babel-loader",
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: "ts-loader",
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "public", "index.html"),
            }),
            new webpack.DefinePlugin({
                "process.env": JSON.stringify(dotenv.parsed),
            }),
        ],
    };
};
