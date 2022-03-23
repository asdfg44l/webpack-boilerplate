// const Handlebars = require('handlebars')

// const { i18nGetter } = require('@/javascript/i18nLoader.js')

// //register helper
// Handlebars.registerHelper('trans', (str) => {
//     const i18n = i18nGetter()
//     return i18n._(str)
// })

const { i18nGetter } = require('@/javascript/i18nLoader.js')

module.exports = function(str) {
    const i18n = i18nGetter()
    return i18n._(str)
}