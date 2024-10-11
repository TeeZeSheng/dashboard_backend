const Profit = require("../models/Profit");
const catchAsync = require("../utils/catchAsync");

exports.getProfit = catchAsync(async (req, res, next) => {
    const now = Date.now();
    const currentDate = new Date(now);
    const month = currentDate.getMonth() + 1; 

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
        profit: profit,
    })
})