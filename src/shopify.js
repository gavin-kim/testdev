"use strict";
var shopify = function () {
    var self = this;
    var https = require('https');

    var Shopify = {
        host: 'kwanii.myshopify.com',
        apiKey: '7461e1e68460a86ba3a457c647031da9',
        password: '4a9e353c1c3cbcae6396e2068f9d66d8'
    };

    self.requestProducts = function (callback) {

        let options = getOptions("/admin/products.json", "GET");

        https.request(options, function (response) {

            let str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function (chunk) {
                console.log(str);
                if (callback)
                    callback(str);
            });

        }).on('error', function (err) {
            console.error(err);

        }).end();
    };

    // get options for HTTPS request
    function getOptions(path, method) {
        return {
            host: Shopify.host,
            port: 443,
            path: path,
            method: method,
            auth: Shopify.apiKey + ':' + Shopify.password,
            headers: {
                'Content-Type': 'application/json' // mandatory
            }

        };
    }

    // request draft order and invoke callback with the response
    self.createDraftOrder = function(variantId, price, qty, percentage, callback) {

        let options = getOptions("/admin/draft_orders.json", "POST");
        let post_data = getDraftOrderObject(variantId, price, qty, percentage);

        let request = https.request(options, function (response) {

            console.log('statusCode:', response.statusCode);
            console.log('headers:', response.headers);
            response.setEncoding('utf8');

            let str = '';
            response.on('data', function (chunk) {
                str += chunk;
            });
            response.on('end', function (chunk) {
                if (callback)
                    callback(str)
            });

        }).on('error', function (err) {
            console.error(err);
            if (callback)
                callback(err);
        });

        request.write(JSON.stringify(post_data));
        request.end();
    };

    // get draft order object applied discount
    function getDraftOrderObject (variantId, price, qty, percentage) {
        return {
            draft_order: {
                line_items: [{
                    variant_id: variantId,
                    quantity: qty,
                    texable: true
                }],
                applied_discount: {
                    title: "testdev discount",
                    description: percentage + "% discount",
                    value: percentage,
                    value_type: "percentage",
                    amount: Math.floor(price * parseInt(qty) * percentage) / 100
                }
            }
        };
    };
};
module.exports = shopify;