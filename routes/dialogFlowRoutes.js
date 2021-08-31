const queryRouter = require("../queryRoute")


module.exports = app => {
    app.get("/", (req, res) => {
        res.send({ "Hello": "Friend" })
    })
    app.use("/api", queryRouter)
}