var express = require("express");
var Router = express.Router();
var services = require("../controller/controller");

Router.post('/create/data', services.createProductDetails);
Router.get('/access-product/details', services.accessProducts);
Router.post('/add-to-cart', services.addToCart);
Router.get('/count-product', services.sum_of_products);
Router.get('/checkout-cart', services.checkoutDetails);
Router.post('/remove-cart', services.remove_product_cart);

module.exports = Router;