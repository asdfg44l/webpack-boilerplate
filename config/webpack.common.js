const path = require('path')

//factory
const { HtmlPageList } = require('../src/javascript/htmlFactory.js')

//plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const InlineSourceWebpackPlugin = require('inline-source-webpack-plugin')

module.exports = {
    entry: {
        main:  path.join(process.cwd(), 'src/entry.js'),
        // test:  path.join(process.cwd(), 'src/test.js')
    },
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
        //Handlebars
        ...HtmlPageList,

        //Inject inline source
        new InlineSourceWebpackPlugin({
            compress: true,
            rootpath: './src',
            noAssetMatch: 'warn'
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
            //helpers list: https://github.com/helpers/handlebars-helpers#helpers
            {
                test: /\.(hbs|handlebars)$/i,
                use: [
                    {
                        loader: "handlebars-loader",
                        options: {
                            helperDirs: path.join(process.cwd(), 'src', 'helpers'),
                            partialDirs: path.join(process.cwd(), 'src', 'partials'),
                            // This option tells to to require the assest 👇
                            inlineRequires: '\/assets\ | \/src\/',
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
                test: /\.(?:ico|gif|png|jpe?g|svg)$/i,
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
                test: /\.(woff(2)?|eot|ttf|otf|$)/,
                type: 'asset',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
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
    },
    node: {
        global: true
    }
}