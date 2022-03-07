const Handlebars = require('handlebars')

const root = document.getElementById('root')
const template = Handlebars.compile(root)

template({
    testStr: 'this is a test string'
})