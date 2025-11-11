const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { isEmpty } = require('lodash');
const SiteRegistration = mongoose.model('SiteRegistration')
const Expenses =  mongoose.model('Expense');
const Transaction = mongoose.model('Transaction');

module.exports.addSite = (req,res,next) =>{
    var  siteRegistration = new  SiteRegistration()
    siteRegistration.siteName = req.body.siteName;
    siteRegistration.location = req.body.location;
    siteRegistration.billNo = req.body.billNo;
    siteRegistration.poNo = req.body.poNo;
    siteRegistration.date = req.body.date
    siteRegistration.closingdate = req.body.closingdate;
    siteRegistration.status= req.body.status;
    siteRegistration.work= req.body.work;
    siteRegistration.number= req.body.number;
    siteRegistration.billStatus = null;
    siteRegistration.uniqueSiteId = req.body.uniqueSiteId
    siteRegistration.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getSiteReg = (req,res,next)=>{
    SiteRegistration.find(function (err, siteData) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( siteData);
    }
    });
 }

 module.exports.getSiteById = (req,res,next)=>{
  let id = req.params.id;
  SiteRegistration.findOne({_id:id},
    (err,user)=>{
        if(!user)
        return res.status(404).json({
            status:false,message:"User not found"
        })
      else
        return res.status(200).json({
            status:true,user: user
        })
    }
    )
   }

   module.exports.updateSite = (req,res,next)=>{
    SiteRegistration.findById(req.params.id, function (err, siteRegistration) {
     
      if (!siteRegistration)
      
      return next(new Error('Unable To Find Site With This Id'));
      else {
        siteRegistration.siteName = req.body.siteName;
        siteRegistration.location = req.body.location;
        siteRegistration.billNo = req.body.billNo;
        siteRegistration.poNo = req.body.poNo;
        siteRegistration.date = req.body.date
        siteRegistration.closingdate = req.body.closingdate;
        siteRegistration.status= req.body.status;
        siteRegistration.work= req.body.work;
        siteRegistration.number= req.body.number;
        siteRegistration.billStatus = req.body.billStatus;
        siteRegistration.uniqueSiteId = req.body.uniqueSiteId
        siteRegistration.save().then(emp => {

          
      res.json('Site Updated Successfully');
      })
      .catch(err => {
      res.status(400).send("Unable To Update Site");
      });
      }
      });
   } 

    module.exports.deleteSite = (req,res,next)=>{
    
      let id = req.params.id;
      SiteRegistration.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else {
          
          res.json('Site Detailed Deleted Successfully');
        }
        });
      }
 
module.exports.getSiteSummary = async (req, res, next) => {
  try {
    // Step 1: Get all sites
    const sites = await SiteRegistration.find();

    // Step 2: Build summary for each site
    const siteSummaries = await Promise.all(
      sites.map(async (site) => {
        const { siteName, location, uniqueSiteId } = site;

        // Calculate total expense for that site
        const expenseTotalResult = await Expenses.aggregate([
          { $match: { uniqueSiteId } },
          { $group: { _id: null, totalExpense: { $sum: "$expenseAmount" } } }
        ]);

        const totalExpenseAmount =
          expenseTotalResult.length > 0
            ? expenseTotalResult[0].totalExpense
            : 0;

        // Calculate total transaction for that site
        const transactionTotalResult = await Transaction.aggregate([
          { $match: { uniqueSiteId } },
          { $group: { _id: null, totalTransaction: { $sum: "$totalAmount" } } }
        ]);

        const totalTransactionAmount =
          transactionTotalResult.length > 0
            ? transactionTotalResult[0].totalTransaction
            : 0;

        return {
          siteName,
          location,
          date: site.date || null,
          totalExpenseAmount,
          totalTransactionAmount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: siteSummaries
    });
  } catch (error) {
    console.error("Error fetching site summary:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching site summary",
      error: error.message
    });
  }
};