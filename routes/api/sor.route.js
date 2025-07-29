const express =  require("express");
const router = express.Router();
const jwtHelper = require('../../config/jwtHelper');

const sorsData = require('../../controller/sor.controller');
router.post('/add-sor',sorsData.addSor);
// router.post('/authenticate',ctrlUser.authenticate);
router.get('/getSor',sorsData.getSor);
router.get('/getSorById/:id',sorsData.getSORById);
router.put('/updateSor',sorsData.updateSor);
router.delete('/deleteSor/:id',sorsData.deleteSOR);
router.post('/add-sample-sor-mb',sorsData.addSampleSorMB);
router.get('/getSampleSorMB',sorsData.getSampleSorMB);
router.post('/add-sor-reg-site',sorsData.addSorRegardingSite);
router.post('/add-bill-sor',sorsData.addBillSor);
router.get('/sor-bill',sorsData.getSorBill);
router.get('/get-sor-reg-site',sorsData.getSorRegSite);
router.put('/updateSorbyReg/:id',sorsData.updateSorRegBySite);
router.delete('/delete-sor-bill/:id',sorsData.deleteSorBill);
router.delete('/delete-sor-mb/:id',sorsData.deleteSorRegSite);
router.get('/getSORREgardingById/:id',sorsData.getSORREgardingById);
router.get('/getSORRBillById/:id',sorsData.getSORBillById)
router.get('/state/:stateName', sorsData.getSORByStateName);
router.get('/mb/getSampleMBByState/:state',sorsData.getSampleMBByState);
router.get('/mb/deleteSampleMB',sorsData.deleteSORMB);
router.get('/getSampleSorMBForDropDown',sorsData.getSampleSorMBForDropDown)

// router.get('/getexpensesByQuery', expensesData.getExpensesByComNameandloc);

module.exports = router;