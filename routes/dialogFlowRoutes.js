// const fulfillmentRouter = require("./fulfillmentRoute")
const queryRouter = require("./queryRoute")
module.exports = app => {
    app.get("/", (req, res) => {
        res.send("HI")
    })
    app.use("/api", queryRouter)
    // app.use("/", fulfillmentRouter)
}