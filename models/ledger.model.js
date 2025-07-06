var mongoose = require('mongoose');

var LedgerSchema = new mongoose.Schema({
    id:String,
    fromDate: String,
    toDate : String,
    accountName: String,
    totalCredit : String,
    totalDebit :String,
    closingBal : String,
    grandCredit :String,
    grandDebit : String,
    dataArray: Array,
   companyDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    gstin: { type: String, required: true }
  }
   
})

module.exports = mongoose.model('Ledger',LedgerSchema);