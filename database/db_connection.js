const mongoose = require('mongoose');
const config = require('../config/keys')
mongoose.connect(config.mongoURI, { useNewUrlParser: true })
mongoose.connection.on("open", () => console.log(`"MongoDb connected" ${config.mongoURI}`))