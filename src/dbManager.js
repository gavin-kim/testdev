var dbManager = function() {
    var self = this;
    var mongodb = require('mongodb');
    var SERVER_URL = 'mongodb://localhost:27017/test';

    self.loadProducts = function (callback) {
        mongodb.MongoClient.connect(SERVER_URL, function (err, db) {

            if (err)
                console.log('Unable to connect to the mongoDB server', err);
            else {
                console.log('Connection established to ', SERVER_URL);

                db.collection('products').find().toArray(callback);
                db.close();
            }
        });

    };

    self.saveProducts = function (products) {

        mongodb.MongoClient.connect(SERVER_URL, function (err, db) {

            if (err)
                console.log('Unable to connect to the MongoDB server: ', err);
            else {
                console.log('Connection established to ', SERVER_URL);

                var collection = db.collection('products');

                products.forEach(function (product) {
                    product._id = product.id;
                    collection.updateOne(
                        {_id: product._id}, // filter
                        {$set: product},    // update values ($set: replace)
                        {upsert: true}, // insert item if no match was found
                        function (err, result) {
                            if (err)
                                console.error(err);
                            else
                                console.log("updated");
                        });
                });
                db.close();
            }
        });
    }
};

module.exports = dbManager;