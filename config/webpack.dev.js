const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

//plugins
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: './env/.development.env'
        })
    ],
    devServer: {
        static: {
            directory: path.resolve(process.cwd(), 'dist'),
            watch: true
        },
        compress: true,
        hot: false,
        port: 8989
    }
})