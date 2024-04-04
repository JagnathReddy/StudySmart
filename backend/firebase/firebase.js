const { credential } = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
exports.app=initializeApp({
    credential: credential.cert(JSON.parse(process.env.SERVICE_ACCOUNT)),
    storageBucket: "gbuild-e29bf.appspot.com"
});


