const path = require('path')

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: [
        path.join(process.cwd(), 'src/entry.js')
    ],
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'javascript/[name].js',
        clean: true
    },
    resolve: {
        alias: {
            //resolve webpack + require handlebars error
            handlebars: 'handlebars/dist/handlebars.min.js',
            '@': path.resolve(process.cwd(), 'src')
        }
    },
    plugins: [
        //handlebars
        //要新增頁面的話必須加入新的 HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            title: 'Webpack Handlebars Boilerplate',
            template: path.join(process.cwd(), "src", "pages", "index.hbs"),
            filename: path.join(process.cwd(), "dist", "index.html"),
            inject: true
        }),
        //MiniCss
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        })
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
                use: [
                    {
                        loader: "handlebars-loader",
                        options: {
                            helperDirs: path.join(process.cwd(), 'src', 'helpers'),
                            partialDirs: path.join(process.cwd(), 'src', 'partials')
                        }
                    }
                ],
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
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}