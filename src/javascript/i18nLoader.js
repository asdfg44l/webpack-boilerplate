import { i18n } from "@lingui/core";

//import plural rules
import { en, zh } from "make-plural/plurals"

i18n.loadLocaleData("en-us", { plurals: en })
i18n.loadLocaleData("zh-tw", { plurals: zh })

//Init user language
export function initLanguage() {
    const User_Language = localStorage.getItem('royalq_language') || navigator.language
    i18nSetter(User_Language.toLowerCase())
}

export function i18nSetter(locale) {
    const messages = require(`@/locales/_${locale}.json`)
    i18n.load(locale, messages)
    i18n.activate(locale)
    //set
    localStorage.setItem('royalq_language', locale)
}

export function i18nGetter() {
    return i18n
}