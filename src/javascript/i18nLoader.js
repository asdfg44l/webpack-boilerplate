import { i18n } from "@lingui/core";

//import plural rules
import { en, zh } from "make-plural/plurals"

i18n.loadLocaleData("en-us", { plurals: en })
i18n.loadLocaleData("zh-tw", { plurals: zh })

//Init user language
export function initLanguage() {
    const User_Language = localStorage.getItem('royalq_language') || navigator.language
    i18nSetter(User_Language.toLowerCase())

    //init select value
    const langSwitch = document.getElementById('lang')
    langSwitch.value = User_Language
    console.log(navigator)
    //listen select change
    langSwitch.addEventListener('change', async(e) => {
        e.preventDefault()
        const i18n = i18nSetter(e.target.value)
        // console.log('---', i18n)
        //get all i18n text
        const translateList = document.querySelectorAll('.i18n')
        translateList.forEach(item => {
            console.log(i18n._locale, item.textContent.trim())
            item.textContent = i18n._(item.dataset.i18n.trim())
            // console.log(i18n._(item.textContent.trim()))
        })
    })
}

export function i18nSetter(locale) {
    const messages = require(`@/locales/_${locale}.json`)
    i18n.load(locale, messages)
    i18n.activate(locale)
    //set
    localStorage.setItem('royalq_language', locale)

    return i18n
}
