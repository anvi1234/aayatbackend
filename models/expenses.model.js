const mongoose  = require("mongoose");

var expenseSchema  = new mongoose.Schema({
 superVisorName:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    },
    date:{
        type:Date
    },
    expenseAmount:{
        type:Number,
    },
    location:{
        type:String,
        
    },
    siteName:{
        type:String,
        
    },
    uniqueSiteId:{
        type:String,
    },
    status:{
        type:String,
        
    },
    work:{
        type:String,
        
    },
     approvedBy:{
        type:String,
        
    },
    rejectedBy:{
        type:String,
        
    },
    partyDetailsName:{
        type:String,
        
    },
    partyDetailsAccount:{
        type:String,
        
    },
   billNo:{
        type:String,
        
    },
    expensesType:{
        type:String,
    },
    expenses: [{
        productItem : String,
        amount :Number,
        quantity:String
         }],
           expenseTypeId: {
             type:String
           }
})

mongoose.model('Expense', expenseSchema )
