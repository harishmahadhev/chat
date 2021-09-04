const express = require('express');
const app = express();
const cors = require('cors')
// const fulfillmentRouter = require("./routes/fulfillmentRoute")
const queryRouter = require("./routes/queryRoute")
require('./database/db_connection')
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use("/api", queryRouter)
// app.use("/", fulfillmentRouter)


app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`)
})