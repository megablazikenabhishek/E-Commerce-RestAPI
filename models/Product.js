const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String, 
        required: true,
    },
    img: {
        type: String, 
        required: true,
    },
    catagories: {
        type: Array
    }, 
    size: String,
    color: String,
    price: {type: Number, required: true}
},
{timestamps: true},
);

module.exports = mongoose.model(ProductSchema);