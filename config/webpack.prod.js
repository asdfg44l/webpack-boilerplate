const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

//plugins
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'production',
    performance: {
        hints: false
    },
    plugins: [
        new Dotenv({
            path: './env/.production.env'
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/i,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
    }
})