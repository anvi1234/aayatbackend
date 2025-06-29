const mongoose = require('mongoose');
const passport = require('passport');
const _= require('lodash');
const { resolveObjectURL } = require('buffer');
const Transaction = mongoose.model('Transaction');
const Expense = mongoose.model('Expense')
global.transactionArray = []
module.exports.addTransaction = (req,res,next) =>{
    var transaction = new  Transaction()
    transaction.superVisorName= req.body.superVisorName;
    transaction.month = req.body.month;
    transaction.year = req.body.year;
    transaction.totalAmount = req.body.totalAmount;
    transaction.date = req.body.date;
    transaction.siteName = req.body.siteName;
    transaction.location = req.body.location;
    transaction.work = req.body.work;
    transaction.givenBy = req.body.givenBy;
    transaction.recievedBy = req.body.recievedBy;
    transaction.partyDetailsAccount = req.body.partyDetailsAccount
    transaction.billNo = req.body.billNo
    transaction.partyDetailsName = req.body.partyDetailsName
    transaction.transactionType =req.body.transactionType
    transaction.remark = req.body.remark
    transaction.uniqueSiteId = req.body.uniqueSiteId
    transaction.expenseTypeId = req.body.expenseTypeId
    transaction.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}

module.exports.getTransaction = (req,res,next)=>{
    Transaction.find(function (err, expenses) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( expenses);
    }
    });
 }

 module.exports.getTransactionById = (req,res,next)=>{
  let id = req.params.id;
  Transaction.findOne({_id:id},
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

 module.exports.updateTransaction = (req,res,next)=>{
    Transaction.findById(req.params.id, function (err,   transaction) {
    if (!  transaction)
    return next(new Error('Unable To Find Transaction With This Id'));
    else {
        transaction.superVisorName= req.body.superVisorName;
        transaction.month = req.body.month;
        transaction.year = req.body.year;
        transaction.totalAmount = req.body.totalAmount;
        transaction.date = req.body.date;
        transaction.siteName = req.body.siteName;
        transaction.location = req.body.location;
        transaction.work = req.body.work;
        transaction.givenBy = req.body.givenBy;
        transaction.recievedBy = req.body.recievedBy;
        transaction.partyDetailsAccount = req.body.partyDetailsAccount
        transaction.billNo = req.body.billNo
        transaction.partyDetailsName = req.body.partyDetailsName
        transaction.transactionType =req.body.transactionType
        transaction.remark = req.body.remark
        transaction.uniqueSiteId = req.body.uniqueSiteId
        transaction.expenseTypeId = req.body.expenseTypeId
        transaction.save().then(emp => {
    res.json(emp);
    })
    .catch(err => {
    res.status(400).send("Unable To Update Transaction");
    });
    }
    });
 } 
    module.exports.deletegetTransaction = (req,res,next)=>{
    
      let id = req.params.id;
      Transaction.findByIdAndRemove({ _id: req.params.id }, function (err,expense) {
        if (err) res.json(err);
        else res.json('Transaction Deleted Successfully');
        });
      }

      module.exports.getTransactionByUniqueId = (req,res,next)=>{
        Transaction.find({ uniqueSiteId : req.params.id},
      (err,trans)=>{
        return res.status(200).json({
          status:true,data: trans
      })
      })
      }
 
      module.exports.getTransactionByComNameandloc = (req,res,next)=>{

        Transaction.find({
          uniqueSiteId : req.params.id
            
        },
        (err,transaction)=>{
          if(!transaction)
          return res.status(404).json({
              status:false,message:"User not found"
          })
        else
          return res.status(200).json({
              status:true,transaction: transaction
          })
        }
        )
        }

        module.exports.getTotalTransByComNameandloc = (req,res,next)=>{
        Transaction.find({
          uniqueSiteId : req.params.id
            },
            (err,expenses)=>{
             
              expenseValue = 0
              expenses.forEach((data)=>{
              expenseValue = expenseValue + data.totalAmount
          })
          obj = { "siteName":req.body.sitename,"location":req.body.location,"status":req.body.status,"transaction":expenseValue }
          return res.status(200).json({
            status:true,data: obj
        })
            })

              
          }

         module.exports.getTotalAmountBySiteId = async (req, res) => {
  const { uniqueSiteId } = req.params; // or req.body / req.query as per your use

  if (!uniqueSiteId) {
    return res.status(400).json({ error: "uniqueSiteId is required" });
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: { uniqueSiteId } // filter by the passed site ID
      },
      {
        $group: {
          _id: "$uniqueSiteId",
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $project: {
          _id: 0,
          uniqueSiteId: "$_id",
          totalAmount: 1
        }
      }
    ]);

    // If no match found, return 0 amount
    if (result.length === 0) {
      return res.json({ uniqueSiteId, totalAmount: 0 });
    }

    res.json(result[0]); // send the sum result
  } catch (err) {
    console.error("Error summing totalAmount:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getTotalBySiteAndExpenseType = async (req, res) => {
  const { uniqueSiteId, expenseTypeId } = req.params;

  if (!uniqueSiteId || !expenseTypeId) {
    return res.status(400).json({ error: "uniqueSiteId and expenseTypeId are required" });
  }

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          uniqueSiteId,
          expenseTypeId
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $project: {
          _id: 0,
          uniqueSiteId: uniqueSiteId,
          expenseTypeId: expenseTypeId,
          totalAmount: 1
        }
      }
    ]);

    const response = result[0] || {
      uniqueSiteId,
      expenseTypeId,
      totalAmount: 0
    };

    res.json(response);
  } catch (err) {
    console.error("Error in aggregation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getTransactionAndExpenseTotals = async (req, res) => {
  const { uniqueSiteId, expenseTypeId } = req.query;

  if (!uniqueSiteId || !expenseTypeId) {
    return res.status(400).json({
      error: "uniqueSiteId and expenseTypeId are required"
    });
  }

  try {
    // Aggregation from Transaction collection
    const [transactionAgg] = await Transaction.aggregate([
      {
        $match: {
          uniqueSiteId,
          expenseTypeId
        }
      },
      {
        $group: {
          _id: null,
          totalTransactionAmount: { $sum: "$totalAmount" }
        }
      }
    ]);

    // Aggregation from Expense collection
    const [expenseAgg] = await Expense.aggregate([
      {
        $match: {
          uniqueSiteId,
          expenseTypeId
        }
      },
      {
        $group: {
          _id: null,
          totalExpenseAmount: { $sum: "$expenseAmount" }
        }
      }
    ]);

    // Return result
    res.json({
      uniqueSiteId,
      expenseTypeId,
      totalTransactionAmount: transactionAgg?.totalTransactionAmount || 0,
      totalExpenseAmount: expenseAgg?.totalExpenseAmount || 0
    });

  } catch (err) {
    console.error("Error in aggregation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
