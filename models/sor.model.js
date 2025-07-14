const mongoose  = require("mongoose");

var sorSchema  = new mongoose.Schema({

    sampleName: String,
    state: String,
    data:[]
   
   
})
module.exports = mongoose.model('Sor',sorSchema);


var addSorSchema  = new mongoose.Schema({
    sampleName: String,
    data:[],
    state:String
   
})
module.exports = mongoose.model('SampleSor',addSorSchema);


var addSorRegardingWorkingSite  = new mongoose.Schema({
    siteName: String,
    locationName:String,
    nameOfConstruction:String,
    nameOfWork:String,
    totalAmount:String,
    gstAmount: String,
    sgstAmount: String,
    combineAmount:String,
    cgst:String,
    sgst:String,
    data:[],
    sampleName:String
   
})
module.exports = mongoose.model('SORRegardingSite',addSorRegardingWorkingSite );

var addSorBill  = new mongoose.Schema({
    billDeatilsObj : {},
    billName:String,
    locationName:String,
    data:[],
    sgst:String,
    cgst:String,
    gstAmount:String,
    sgstAmount:String,
    totalAmount:String,
    combinedAmount:String,
    sampleName:String
})
module.exports = mongoose.model('SORBillSite',addSorBill);
