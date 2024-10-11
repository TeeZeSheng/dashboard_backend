const Revenue = require('../models/Revenue');
const catchAsync = require('../utils/catchAsync');

exports.createRevenue = catchAsync(async (req, res, next) => {
    const revenue = await Revenue.create(req.body);

    res.status(200).json({
        revenue
    })
})

exports.getRevenue = catchAsync(async (req, res, next) => {
    const period = req.params.period;
    const days = [];
    const date = [];

    const today = new Date();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 5);

    const endDate = today;

    
    

    for (let i = 1; i <= period ; i++){
        let temp = new Date(today);
        temp.setDate(today.getDate() - i)
        days.push(temp.getDate())
        
    }

    days.reverse();

    const revenue = await Revenue.aggregate([
        {
            $match: { date: {$gte: startDate, $lte: endDate}}
        },
        {
            $group: {
                _id: { $dateToString: { format: "%d/%m", date: "$date" } },
                price: { $sum: "$price"}
            }
        },
        {
            $sort: {
                _id: 1 
            }
        }
    ])

    let sum = 0;
    for (let index = 0; index < revenue.length; index++) {
        sum = sum + revenue[index].price
        
    }

    const location = await Revenue.aggregate([
        {
            $group: {
                _id: "$location",
                price: {$sum: "$price"}
            }
        }
    ])

    res.status(200).json({
        days: days,
        revenue: revenue,
        sum: sum,
        location: location,
    })
})
