const fulfillmentRouter = require("./fulfillmentRoute")
const queryRouter = require("./queryRoute")
module.exports = app => {
    app.use("/", fulfillmentRouter)
    app.use("/api", queryRouter)
}