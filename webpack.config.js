const path = require('path')

//plugins
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HandlebarsWebpackPlugin = require('handlebars-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: '',
    entry: ['./src/entry'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'javascript/bundle.js',
        clean: true
    },
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    resolve: {
        //resolve webpack + require handlebars error
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    },
    plugins: [
        //html
        // new HtmlWebpackPlugin({
        //     title: 'Webpack Boilerplate',
        //     template: path.join(__dirname, "src", "pages", "index.html"),
        //     filename: "index.html"
        // }),
        //handlebars
        new HtmlWebpackPlugin({
            title: 'Webpack Boilerplate',
            template: path.join(__dirname, "src", "pages", "index.hbs"),
            filename: path.join(__dirname, "dist", "index.html"),
            inject: true
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            //HTML
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            //Handlebars
            {
                test: /\.(hbs|handlebars)$/i,
                use: ["handlebars-loader"]
            },
            //JavaScript ES6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            //Images
            {
                test: /\.(?:ico|gif|png|jpe?g)$/i,
                type: 'asset',
                //解析
                parser: {
                    //to base64
                    dataUrlCondition: {
                        maxSize: 4 * 1024
                    }
                },
                generator: {
                    filename: 'assets/images/[name][ext]'
                }
            },
            //Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|$)/,
                type: 'asset/inline'
            },
            //SCSS
            {
                test: /\.(scss|css)$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist/pages'),
            watch: true
        },
        compress: true,
        open: true,
        hot: false,
        port: 8989
    }
}