'use strict';

/*jshint node:true*/
/* global process, console, exports, module */

let environment = process.env.NODE_ENV;
console.log("Messaging environment: " + environment);
let config;
if (environment === 'production') {
	config = require('./config_prod.json');
}
else {
	config = require('./config.json');
}

module.exports = config;

