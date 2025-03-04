const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,

    },
    

})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
})

userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;
    next();
})

userSchema.pre(/^find/, function(next) {
    this.find({active: {$ne: false}});
    next();
})

// userSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'workout',
//     })

//     next();
// })

userSchema.methods.correctPassword = function(candidatePassword, userPassword) {
    return bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPassword = function(JWTTime) {
    console.log("in function changedPassword");
    if (this.passwordChangedAt) {
        const timeStamp = parseInt( this.passwordChangedAt.getTime() / 1000, 10);
        console.log(timeStamp, JWTTime);
        return JWTTime < timeStamp;
    }
    return false
    
    // return true;
}

userSchema.methods.createResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({resetToken}, this.passwordResetToken)

    this.passwordResetTokenExpired = Date.now() + 1000 * 60 * 1000;

    return resetToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;