if(process.env.NODE_ENV === 'development') {
    require('./pages/index.hbs')
}

//require javascript
const { test } = require('./test')
require('./index')


//import scss
import './assets/scss/all.scss'

test()