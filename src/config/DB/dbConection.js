const mongoose = require("mongoose");
const handelError=require('../../utils/errorHandler')
const database = handelError(mongoose.connect('mongodb://localhost:27017/config').then((conn)=>{
    console.log('DB Connected.. ')
}))

module.exports = database;
