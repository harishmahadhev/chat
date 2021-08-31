const express = require('express');
const queryRouter = require("./queryRoute.js")
const app = express();
app.use(express.json())
require('./routes/dialogFlowRoutes.js')(app)

const PORT = process.env.PORT || 5000
const node = process.env.NODE_ENV
console.log(node)
app.listen(PORT, () => {
    console.log("Server Started at PORT")
})