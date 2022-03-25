import { i18n } from "@lingui/core";

//import plural rules
import { en, zh } from "make-plural/plurals"

i18n.loadLocaleData("en-us", { plurals: en })
i18n.loadLocaleData("zh-tw", { plurals: zh })

//setting i18n
export function _i18nSetter(locale) {
    try {
        const messages = require(`@/locales/_${locale}.json`)
        i18n.load(locale, messages)
        i18n.activate(locale)
    }
    catch {
        _i18nSetter('en-us')
    }
    finally {
        //set
        localStorage.setItem('royalq_language', locale)
    }
}

//Init user language
export function initLanguage() {
    //get user language
    const User_Language = localStorage.getItem('royalq_language') || navigator.language
    _i18nSetter(User_Language.toLowerCase())

    //init i18n text
    const initI18nText = () => {
        const translateList = document.querySelectorAll('.i18n')
        translateList.forEach(item => {
            item.textContent = i18n._(item.dataset.i18n.trim())
        })
    }
    initI18nText()

    //init select value
    const langSwitch = document.getElementById('lang')
    langSwitch.value = User_Language
    
    //listen select change
    langSwitch.addEventListener('change', async(e) => {
        e.preventDefault()
        _i18nSetter(e.target.value)
        initI18nText()
    })
}


