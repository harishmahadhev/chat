const mongoose = require('mongoose');
const { mongoURI } = require('../config/keys')
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.on("open", () => console.log("MongoDb connected"))