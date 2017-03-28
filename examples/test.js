"use strict";

var mongodb = require('mongodb');
var https = require('https');
var express = require('express');

var MONGODB_URL = 'mongodb://localhost:27017/test';
var app = express();


var TestDev = {
    shopName: 'gointegrations-devtest',
    apiKey: 'edd7fd7dac31cb81df28f91455649911',
    password: '330c304080eb8a70845b94ad0269bc50'
};

var Kwanii = {
    shopName: 'kwanii',
    apiKey: '7461e1e68460a86ba3a457c647031da9',
    password: '4a9e353c1c3cbcae6396e2068f9d66d8'
};


function getProducts() {
    shopify_kwanii.product.list()
        .then(function(products) {
            console.log("Got products", products);
            //saveProducts(products);
        }).catch(function (err) {
            console.log("Error", err);
        });
};

function createDraftOrder() {
    var post_data = {
        "draft_order": {
            "line_items": [
                {
                    "title": "Samsung Galaxy S6 Edge",
                    "price": "20.00",
                    "quantity": 2
                }
            ]
        }
    };
/*            "applied_discount": {
                "title": "25% discount",
                "value": "25",
                "value_type": "percentage",
                "amount": "floor(price * quantity * value) / 100"
            }*/

    shopify_kwanii.draftOrder.create(post_data)
        .then(function(draftOrder) {
            console.log("OK", draftOrder);
        }).catch(function (err) {
            console.log("Error", err);
        });
}

function createDraftOrder2() {
    var post_data = JSON.stringify({
        "draft_order": {
            "line_items": [
                {
                    "title": "Samsung Galaxy S6 Edge",
                    "price": "20.00",
                    "quantity": 2
                }
            ]
        }
    });

    var options = {
        host: Kwanii.shopName + '.myshopify.com',
        path: '/admin/draft_orders.json',
        method: 'POST',
        auth: Kwanii.apiKey + ":" + Kwanii.password
    };



    var request = https.request(options, function(response) {

            console.log('statusCode:', response.statusCode);
            console.log('headers:', response.headers);

            var str = '';
            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function(chunk) {
                console.log(str);
            });

        }).on('error', function(err) {
        console.error(err);
    });

    request.write(post_data);
    request.end();
}



function init() {
    //getProducts();
    createDraftOrder2();
};

init();
