const fulfillmentRouter = require("./fulfillmentRoute")
const queryRouter = require("./queryRoute")
module.exports = app => {
    app.use("/api", queryRouter)
    app.use("/", fulfillmentRouter)

}