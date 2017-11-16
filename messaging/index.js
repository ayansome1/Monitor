/* global require,console,module*/
"use strict";

var q = require('q');
var config = require('./config.js');
var request = require('request');


function notifySlack(data) {


    var deferred = q.defer();

    request.post(config.slack.url, {
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        },
        function(error) {

            if (error) {
                console.error(error);
                deferred.reject(error);
                return;
            }

            deferred.resolve('Notifying slack...');
        });

    return deferred.promise;

}

module.exports = {
    notifySlack : notifySlack
};
