// Root index.js
const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const port = 3000

const app = express()

// Listen to a port
app.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
}) 

// Configure Express
/*app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views')) */


// Export variables
module.exports.app = app;
module.exports.exphbs = exphbs;
module.exports.express = express;
module.exports.path = path;

//Import all modules
require('./login/login')
require('./login/doctor')
require('./login/patient')
require('./login/pharmacist')
require('./database_setup')
