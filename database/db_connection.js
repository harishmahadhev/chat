const mongoose = require('mongoose');
const config = require('../config/keys')
mongoose.connect(config.mongoURI, { useNewUrlParser: true }, (err) => { if (err) console.log("error :", JSON.stringify(err, undefined, 2)) })
mongoose.connection.on("open", () => console.log("MongoDb connected"))