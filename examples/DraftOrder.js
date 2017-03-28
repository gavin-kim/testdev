let https = require('https');
let Shopify = {
    host: 'kwanii.myshopify.com',
    apiKey: '7461e1e68460a86ba3a457c647031da9',
    password: '4a9e353c1c3cbcae6396e2068f9d66d8'
};
let products;

function getProductsAndDraftOrder() {

    let options = getOptions("/admin/products.json", "GET");

    https.request(options, function (response) {

        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);

        let str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function (chunk) {
            products = JSON.parse(str).products;
            createDraftOrder(products[2], 3);
        });

    }).on('error', function (err) {
        console.error(err);

    }).end();
}


function getDraftOrderObject(product, qty) {

    return {
        draft_order: {
            line_items: [
                {
                    variant_id: product.variants[0].id,
                    quantity: qty,
                    texable: true
                }
            ],
            applied_discount: {
                title: "testdev discount",
                description: "25% discount",
                value: 25,
                value_type: "percentage",
                amount: Math.floor(product.variants[0].price * qty * 25) / 100
            }
        }
    };
}

function getOptions(path, method) {
    return {
        host: Shopify.host,
        port: 443,
        path: path,
        method: 'POST',
        auth: Shopify.apiKey + ':' + Shopify.password,
        headers: {
            'Content-Type': 'application/json' // mandatory
        }

    };
}

function createDraftOrder(product, qty) {

    let options = getOptions("/admin/draft_orders.json", "POST");

    let request = https.request(options, function (response) {

        console.log('statusCode:', response.statusCode);
        console.log('headers:', response.headers);
        response.setEncoding('utf8');

        let str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function (chunk) {
            console.log(str);
        });

    }).on('error', function (err) {
        console.error(err);

    });

    let post_data = getDraftOrderObject(product, qty);

    request.write(JSON.stringify(post_data));
    request.end();
}

function init() {
    getProductsAndDraftOrder();
}

init();