var mongoose = require("mongoose");

var productDb = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    image: { type: String },
    price: { type: String },
});

var cartDb = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id: { type: String },
    name: { type: String },
    price: { type: Number },
    qty: { type: Number },
});


var productDetails = mongoose.model('productDb', productDb);
var cartDetails = mongoose.model('cartDb', cartDb);

module.exports = {
    productDetails: productDetails,
    cartDetails: cartDetails
};
