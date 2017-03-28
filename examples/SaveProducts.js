var mongodb = require('mongodb');
var https = require('https');

var Shopify = {
    shopName: 'kwanii',
    apiKey: '7461e1e68460a86ba3a457c647031da9',
    password: '4a9e353c1c3cbcae6396e2068f9d66d8'
};


var MONGODB_URL = 'mongodb://localhost:27017/test';

function getProducts() {
    var options = {
        host: Shopify.shopName + '.myshopify.com',
        port: 443,
        path: '/admin/products.json',
        method: 'GET',
        auth: Shopify.apiKey + ':' + Shopify.password

    };

    https.request(options, function (response) {

        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);

        var str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function(chunk) {
            saveProducts(JSON.parse(str).products);
        });

    }).on('error', function(err) {
        console.error(err);

    }).end();
}


function saveProducts(products) {

    mongodb.MongoClient.connect(MONGODB_URL, function(err, db) {

        if (err)
            console.log('Unable to connect to the mongoDB server. Reason: ', err);
        else {
            console.log('Connection established to ', MONGODB_URL);

            var collection = db.collection('products');

            products.forEach(function(product) {
                product._id = product.id;
                collection.updateOne(
                    {_id : product._id}, // filter
                    {$set: product},     // update values ($set: replace)
                    {upsert: true},      // insert document if no match was found
                    function (err, result) {
                        if (err)
                            console.error(err);
                        else
                            console.log("Inserted", result);
                    });
            });
            db.close();
        }
    });
}

function init() {
    getProducts();
}

init();