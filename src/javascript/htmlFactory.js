const path = require('path')
const fs = require('fs')

//plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

//path
const pagePath = path.resolve(process.cwd(), 'src/pages')

//html title or meta tag (有需要可以拆檔出去)
let configs = {
    index: {
        title: 'Webpack Handlebars Boilerplate'
    }
}

//factory
const HtmlPageList = fs.readdirSync(pagePath).map(item => {
    const fileName = item.match(/(?<fileName>\w*)\./i).groups.fileName

    return new HtmlWebpackPlugin({
        title: configs[fileName].title || '',
        template: path.join(process.cwd(), "src", "pages", `${fileName}.hbs`),
        filename: path.join(process.cwd(), "dist", `${fileName}.html`),
        favicon: path.resolve(process.cwd(), 'src/favicon.ico'),
        // meta: '', tag will append after title tag
        inject: true
    })
})

module.exports = {
    HtmlPageList
}