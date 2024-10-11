const express = require('express');
const profitController = require('../controllers/profitController')

const router = express.Router();

router.get("/getProfit", profitController.getProfit)

module.exports = router