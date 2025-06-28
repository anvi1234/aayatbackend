const mongoose = require('mongoose');
const ExpenseType = mongoose.model('ExpenseType')

module.exports.addExpenseType = (req,res,next) =>{
    var  expenseType = new  ExpenseType()
    expenseType.type = req.body.type;
    expenseType.save((err,doc)=>{
        if(!err)
        res.send(doc);
         else{
                return next(err);
            }
   })
}


module.exports.getExpensesType = (req,res,next)=>{
  Expense.find(function (err, expenses) {
    if (err) {
    console.log(err);
    }
    else {
    res.json( expenses);
    }
    });
 }
