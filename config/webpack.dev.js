const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',
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