const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const transactionData = require('../../controller/transaction.controller');
router.post('/add-transaction',transactionData.addTransaction);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/gettransaction',transactionData.getTransaction);
router.get('/gettransactionById/:id',transactionData.getTransactionById);
router.put('/updatetransaction/:id',transactionData.updateTransaction);
router.delete('/deletetransaction/:id',transactionData.deletegetTransaction);
router.get('/gettransactionByQuery/:id', transactionData.getTransactionByComNameandloc);
router.get('/gettransactionByUId/:id', transactionData.getTransactionByUniqueId);
router.post('/gettotaltransactionByQuery', transactionData.getTotalTransByComNameandloc);
router.get(
  '/sum/:uniqueSiteId/:expenseTypeId',
  transactionData.getTotalBySiteAndExpenseType
);
router.get(
  '/sum-total-amount/:uniqueSiteId',
  transactionData.getTotalAmountBySiteId
);
module.exports = router;