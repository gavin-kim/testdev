var https = require('https');
var Shopify = {
    shopName: 'kwanii',
    apiKey: '7461e1e68460a86ba3a457c647031da9',
    password: '4a9e353c1c3cbcae6396e2068f9d66d8'
};

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
            console.log(str);
        });

    }).on('error', function(err) {
    console.error(err);

}).end();



