"use strict";

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var DbManager = require('../dbManager');
var Shopify = require('../shopify');

var dbManager = new DbManager();
var shopify = new Shopify();
var router = express.Router();

router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded



router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});


router.post('/draft_orders.json', function(req, res) {

    shopify.createDraftOrder(req.body.variantId, req.body.price,
        req.body.qty, req.body.percentage, function(draft_order) {
            res.json(draft_order);
        });
});


router.get('/products.json', function (req, res) {
    dbManager.loadProducts(function (err, products) {
        if (!err)
            res.json(products);
    });
});


module.exports = router;