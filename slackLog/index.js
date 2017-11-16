'use strict';
/* jshint node:true */
let util = require('util');
let messaging = require('messaging');
let winston = require('winston');
let config = require('./config.js');

let CustomLogger = winston.transports.CustomLogger = function(options) {
    this.name = 'customLogger';
    this.level = options.level || 'error';
    this.moduleName = options.moduleName || '';
};

util.inherits(CustomLogger, winston.Transport);

CustomLogger.prototype.log = function(level, msg, meta, callback) {

    if (process.env.NODE_ENV === 'production') {

        if (meta.length) {
            msg += '\n `' + JSON.stringify(meta) + '`';
        }
        if (meta.stack) {
            msg += "\n```" + meta.stack + "```\n";
        }
        if (module) {
            msg = this.moduleName + ':\n' + msg;
        }

        let data = {
            text: msg,
            "icon_emoji": ":anger:",            
            //"username": "error-bot",
            "channel": config.channel
        };

        messaging.notifySlack(data);
    
    }

    callback(null, true);
};


module.exports = CustomLogger;