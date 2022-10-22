const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // postBy : {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'post'
    // },
    createdBy :{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    count : {
        type: Number,
        required: true,
        default: 1,
    },
    price : {
        type: Number,
        required: true
    },
    postImage :{
        type :String,
        required: true
    }
})

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;