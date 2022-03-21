const path = require('path')

//factory
const { HtmlPageList } = require('../src/javascript/htmlFactory.js')

//plugins
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
        /**
         * 要新增頁面的話直接加在pages就可以
         * 頁面的 title, meta設定檔存在 htmlFactory.js
         */
        //handlebars
        ...HtmlPageList,
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
            //helpers list: https://github.com/helpers/handlebars-helpers#helpers
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