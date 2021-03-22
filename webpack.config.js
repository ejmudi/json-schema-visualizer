const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        app: [
            './src/index.tsx'
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3000
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                loader: "ts-loader"
            },
            {
                "test": /\.s?css$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    }
};