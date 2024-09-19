const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


//schema
const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    date : {
        type : Date,
        default : Date.now()
    }
});


//password hashing

userSchema.pre('save',async function (next) {
if(!this.isModified('password')) return next();
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt);
next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;