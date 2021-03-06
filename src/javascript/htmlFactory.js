const path = require('path')
const fs = require('fs')

//plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

//path
const pagePath = path.resolve(process.cwd(), 'src/pages')

//html title or meta tag (有需要可以拆檔出去)
let configs = {
    index: {
        title: 'Webpack Handlebars Boilerplate',
        //appendChunks: []
    },
    about: {
        title: 'this is an about page',
        appendChunks: ['test']
    }
}

//factory
const HtmlPageList = fs.readdirSync(pagePath).map(item => {
    const fileName = item.match(/(?<fileName>\w*)\./i).groups.fileName

    return new HtmlWebpackPlugin({
        title: configs[fileName]?.title || '',
        template: path.join(process.cwd(), "src", "pages", `${fileName}.hbs`),
        filename: path.join(process.cwd(), "dist", `${fileName}.html`),       
        favicon: path.resolve(process.cwd(), 'src/favicon.ico'), // icon 路徑
        chunks: configs[fileName]?.appendChunks 
            ? configs[fileName].appendChunks.concat(['main'])
            : ['main'],
        // meta: '', tag will append after title tag
        inject: true
    })
})

module.exports = {
    HtmlPageList
}