const mongoose  = require("mongoose");

var transactionSchema  = new mongoose.Schema({
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
    totalAmount:{
        type:Number,
    },
    location:{
        type:String,
        
    },
    siteName:{
        type:String,
        
    },
    work:{
        type:String,
     },
     uniqueSiteId:{
        type:String,
    },
    partyDetailsAccount:String,
    billNo:String,
    partyDetailsName:String,
    givenBy:{
    type:String,
   },
   remark:String,
   recievedBy:{
    type:String,  
   },
 
   transactionType:{
    type:String, 
   },
    expenseTypeId: {
    type:String
  }
})

mongoose.model('Transaction', transactionSchema )
