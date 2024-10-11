const Order = require("../models/Order");
const Revenue = require("../models/Revenue");
const catchAsync = require("../utils/catchAsync");

exports.order = catchAsync(async(req, res, next) => {
    const order = await Order.create({
        name: req.body.name,
        productId: req.body.productId,
        price: req.body.price * req.body.quantity,
        quantity: req.body.quantity,
        location: req.body.location,
    });

    const revenue = await Revenue.create({
        name: req.body.name,
        price: req.body.price * req.body.quantity,
        location: req.body.location,

    })

    res.status(200).json({
        message: 'success',
        revenue: revenue,
        order: order,
    })

})

exports.orderDetails = catchAsync(async(req, res, next) => {
    const order = await Order.aggregate([
        {
            $group: {
                _id: "$name",
                quantity: {$sum: "$quantity"}
            }
        }
    ])

    const mostOrder = await Order.aggregate([
        {
            $group: {
              _id: "$name", // Group by name
              totalQuantity: { $sum: "$quantity" } // Sum the quantity
            }
          },
          {
            $sort: { totalQuantity: -1 } // Sort by totalQuantity in descending order
          },
          {
            $limit: 1 // Limit to the top result
          }
    ])

    const todayOrder = await Order.aggregate([
        {
            $match:{
                date: "10/10/24"
                
            }
        },
        { $group: { _id: "$date", count: { $sum: "$quantity" } } }
    ])

    res.status(200).json({
        order: order,
        todayOrder: todayOrder,
        mostOrder: mostOrder,
    })
})