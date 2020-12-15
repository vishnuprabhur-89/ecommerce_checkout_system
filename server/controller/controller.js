var mongoose = require("mongoose");
const Models = require('../models/models.js');

exports.createProductDetails = function (req, res) {
    const productDb = new Models.productDetails({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        price: req.body.price
    });
    productDb.save()
        .then(result => res.status(200).json({ success: "product details as been stored." }))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.accessProducts = function (req, res) {
    Models.productDetails.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
};

exports.addToCart = function (req, res) {
    console.log(req.body)
    Models.cartDetails.findOne({ product_id: req.body.id })
        .then(function (result) {
            if (result != null) {
                Models.cartDetails.updateOne({ _id: result._id }, {
                    product_id: result.product_id,
                    name: result.name,
                    price: result.price,
                    qty: result.qty + 1
                })
                    .then(results => res.status(200).json({ success: "cart updated." }))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
            else {
                const cartDb = new Models.cartDetails({
                    _id: new mongoose.Types.ObjectId(),
                    product_id: req.body.id,
                    name: req.body.name,
                    price: req.body.price,
                    qty: 1
                });
                cartDb.save()
                    .then(results => res.status(200).json({ success: "cart added." }))
                    .catch(err => res.status(400).json('Error: ' + err));
            }
        });
}

exports.sum_of_products = function (req, res) {
    Models.cartDetails.aggregate(
        [
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: "$qty"
                    }
                }
            },
            {
                $project: {
                    _id: 0
                }
            },
        ],
        function (err, result) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(result);
            }
        }
    );
}

exports.checkoutDetails = function (req, res) {
    var total_amount = 0, discount_amount = 0;
    Models.cartDetails.find({}, function (err, result) {
        if (result != null) {
            for (let i = 0; i < result.length; i++) {
                total_amount += result[i].qty * result[i].price
                let amount = price_validation(result[i].qty, result[i].name, result[i].price);
                discount_amount += amount
            }
            res.status(200).json({
                table: result,
                total_amount: total_amount,
                discount_amount: discount_amount,
                Overall_amount: discount_amount > 150 ? discount_amount - 20 : discount_amount
            });
        } else {
            res.status(400).send(err);
        }
    })
}

exports.remove_product_cart = function (req, res) {
    console.log(req.body)
    Models.cartDetails.remove({ _id: req.body._id })
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
}

function price_validation(quantity, status, price) {
    const product_qty = quantity;
    var qty = quantity, combination = 0;

    switch (status) {
        case "A":
            for (let i = 0; i < price; i++) {
                qty -= 3
                if (Math.sign(qty) == 1 || Math.sign(qty) == 0) {
                    combination += 1
                }
            }
            return (combination * 75) + ((product_qty - (combination * 3)) * price)
        case "B":
            for (let i = 0; i < price; i++) {
                qty -= 2
                if (Math.sign(qty) == 1 || Math.sign(qty) == 0) {
                    combination += 1
                }
            }
            return (combination * 35) + ((product_qty - (combination * 2)) * price)
        default:
            return qty * price;
    }
}