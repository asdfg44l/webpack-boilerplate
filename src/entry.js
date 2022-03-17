if(process.env.NODE_ENV === 'development') {
    require('./pages/index.hbs')
}

//require javascript
require('./javascript/test.js')
require('./javascript/index.js')


//import scss
import './assets/scss/all.scss'

