const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Portal',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
console.log('connected')