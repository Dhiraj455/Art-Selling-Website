const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true,
        // data: Buffer,
        // contentType: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    description: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.pre('save', async function(next) {
    var user = this;
    if(this.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
        user.cpassword = await bcrypt.hash(user.cpassword, 10);
    }
    next();
});
    
UserSchema.methods.generateAuthToken = async function() {
    try{
        const token = jwt.sign({_id: this._id}, process.env.JWT_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}

const User = mongoose.model('User', UserSchema);
module.exports = User;