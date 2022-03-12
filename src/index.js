const Handlebars = require('handlebars')

//data
import testJSON from './assets/data/test.json'

//template
const { default: testTemplate } = require('./templates/test.html')

//load
const renderTemplate = (data, template, anchor) => {
    const content = Handlebars.compile(template.toString())(data)
    $(anchor).append(content)
}

renderTemplate(testJSON, testTemplate, "#root")
