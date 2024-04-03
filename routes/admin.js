const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const productsController = require('../controllers/products');

const router = express.Router();

const products = [];

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

router.post('/product', (req, res, next) => {
    console.log(req.body);
    products.push({ title: req.body.title });
    res.redirect('/');
});


module.exports = router;
// exports.products = products;
