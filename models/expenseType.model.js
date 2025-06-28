const mongoose  = require("mongoose");

var expenseTypeSchema  = new mongoose.Schema({
 type:{
        type:String
 }
})

mongoose.model('ExpenseType', expenseTypeSchema )
