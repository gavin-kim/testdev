#!/usr/bin/env

"use strict";

// Module dependencies
var app = require('./app');
var debug = require('debug')('testdev:server');
var http = require('http');
var port = 3000;
var DbManager = require('./dbManager');
var Shopify = require('./shopify');

var dbManager = new DbManager();
var shopify = new Shopify();

// Store a port number in Express
app.set('port', port);

// Create HTTP server
var server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// For "error" event
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;

    var bind = (typeof port === 'string' ? 'Pipe ' : 'Port ') + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// For "listening" event
function onListening() {
    shopify.requestProducts(function(products) {
        if (products)
            dbManager.saveProducts(JSON.parse(products).products);
    });

    var addr = server.address();
    var bind = typeof port === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
    debug('Listening on ' + bind);
}