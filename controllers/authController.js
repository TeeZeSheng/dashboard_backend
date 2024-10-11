const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async(req, res, next) => {
        console.log(req.headers)
        let username = req.body.username;
        let password = req.body.password;
    
        if (!username || !password ) {
            res.status(401).json({
                message: "Password or Username cannot be empty"
            })
        }
    
        const user = await User.findOne({username}).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        
        // req.session.user= user
        // console.log(req.session.user)
        // req.session.authenticated = true
        // req.session.testing = 'test'
    
        console.log(req.ip)
    
        res.status(200).json({
            status: "success",
            
        })
        
        
    
    })

exports.protect = catchAsync(async (req, res, next) => {
    console.log(req.session.authenticated)
    if(req.session.authenticated) {
        req.user = req.session.user
    }

    next();
})

exports.create = catchAsync(async (req, res, next) => {
    const user = await User.create({
        username: "admin",
        password: "admin123"
    })

    res.status(200).json({
        user
    })
})


