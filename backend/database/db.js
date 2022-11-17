// connect to db
const mongoose = require("mongoose");
var mongoDB = 'mongodb://127.0.0.1/db';
mongoose.connect(mongoDB);

mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose connection done');
});


db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

