const Expense = require("../models/Expense");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user);

    res.status(200).json({
        user
    })
})