const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.createNewUser = functions.auth.user().onCreate(event => {});
