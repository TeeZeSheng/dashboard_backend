const express = require('express');
const orderController = require('./../controllers/orderController')
const authController = require('./../controllers/authController')

const router = express.Router();

router.post('/createOrder', orderController.order);
router.get('/getOrder', orderController.orderDetails);
router.post('/user', authController.create)

module.exports = router

