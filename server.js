const express = require('express')
require('./config/db.js')
const userrouter = require('./routes/router.js')
const app = express()
const port = process.env.PORT||3000
const User = require('./models/model.js')
app.use(express.json())
app.use(userrouter)
app.listen(port,() =>{
    console.log('port is on '+port)
})