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
            filename: path.join(__dirname, "dist", "pages", "index.html"),
            inject: true
        }),
        // new HandlebarsWebpackPlugin({
        //     htmlWebpackPlugin: {
        //         enabled: true,
        //         prefix: "html",
        //         HtmlWebpackPlugin
        //     },

        //     entry: path.join(process.cwd(), "src", "pages", "*.hbs"),
        //     output: path.join(process.cwd(), "dist", "[name].html"),

        //     partials: [
        //         path.join(process.cwd(), "html",/* <-- this should match htmlWebpackPlugin.prefix */ "*", "*.hbs"),
        //         path.join(process.cwd(), "src", "hbs", "*", "*.hbs")
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            //JavaScript ES6
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // Images
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
            // Fonts and SVGs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|$)/,
                type: 'asset/inline'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(hbs|handlebars)$/i,
                use: ["handlebars-loader"]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist/pages'),
            watch: true
        },
        compress: true,
        hot: false,
        port: 8989
    }
}