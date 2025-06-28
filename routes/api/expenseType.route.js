const express =  require("express");
const router = express();
const jwtHelper = require('../../config/jwtHelper');

const expensesData = require('../../controller/expenseType.controller');
router.get('/getExpensesType',expensesData.getExpenses);

module.exports = router;