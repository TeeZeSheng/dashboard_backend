const express = require('express');
const orderController = require('./../controllers/orderController')
const authController = require('./../controllers/authController')
const expenseController = require('./../controllers/userController')
const userController = require('./../controllers/userController')

const router = express.Router();

router.post("/login", authController.login)
router.get('/getUser', authController.protect, userController.getUser)

module.exports = router

