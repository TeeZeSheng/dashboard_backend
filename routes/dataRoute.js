const express = require('express');
const revenueController = require('../controllers/revenueController');
const expenseController = require('.././controllers/expenseController')
const authController = require('.././controllers/authController')


const router = express.Router();

router.get('/getRevenue/:period', revenueController.getRevenue);
router.post('/createRevenue', revenueController.createRevenue);
router.get('/getExpenses', expenseController.getExpenses)


module.exports = router

