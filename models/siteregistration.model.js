var mongoose = require('mongoose');

var SiteRegistrationSchema = new mongoose.Schema({
    id:String,
    siteName:String,
    location:String,
    work:String,
    number:String,
    poNo:String,
    billNo:String,
    date:Date,
    status:String,
    closingdate:Date,
    billStatus:String,
    uniqueSiteId:String,

})

module.exports = mongoose.model('SiteRegistration',SiteRegistrationSchema);