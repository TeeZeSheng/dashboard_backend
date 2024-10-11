const Expense = require("../models/Expense");
const Profit = require("../models/Profit")
const catchAsync = require("../utils/catchAsync");

exports.getExpenses = catchAsync(async(req, res, next) => {
    const now = new Date(Date.now());
    const month = now.getMonth() + 1; 
    const year = now.getFullYear();
    const expense = await Expense.aggregate([
        {
            $match: {
                $and: [
                    { $expr: { $eq: [{ $month: "$date" }, month] } }, 
                    { $expr: { $eq: [{ $year: "$date" }, year] } } 
                ]
            }
        }
    ])

    const profit = await Profit.aggregate([
        {
            $match: {
              $expr: {
                $eq: [{ $month: "$date" }, month]  
              }
            }
          },
          {
            $project: {
              _id: 0,
              date:  { $dateToString: { format: "%d/%m", date: "$date" } },    
              profit: 1  
            }
          },
          {
            $sort: {
                date: 1 
            }
          }
      ])

    res.status(200).json({
        expense,
        profit
    })
})