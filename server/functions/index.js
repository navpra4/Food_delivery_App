/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
require('dotenv').config()

const serviceAccountkey = require("./serviceAccountKey.json");
const express = require('express');
const app = express();

app.use(express.json());

const cors = require("cors");
const { FirebaseFunctionsTest } = require("firebase-functions-test/lib/lifecycle");
app.use(cors({origin: true}));
app.use((req, res , next)=>{
    res.set("Accees-Control-Allow-Origin","*");
    next();
});

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountkey),
});

app.get("/",(req, res)=>{
    return res.send("hello world");
})

const userRoute = require("./routes/user");
const { https } = require("firebase-functions/v2");
app.use('/api/users', userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = https.onRequest(app)