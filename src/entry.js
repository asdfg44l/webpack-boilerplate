//require javascript
import { i18nSetter, i18nGetter, initLanguage } from '@/javascript/i18nLoader.js'

//import scss
import './assets/scss/all.scss'


//init language
initLanguage()
const langSwitch = document.getElementById('lang')
langSwitch.value = localStorage.getItem('royalq_language')


langSwitch.addEventListener('change', async(e) => {
    e.preventDefault()
    i18nSetter(e.target.value)
})
