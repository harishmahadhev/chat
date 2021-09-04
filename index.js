const express = require('express');
const app = express();
const cors = require('cors')
const fulfillmentRouter = require("./routes/fulfillmentRoute")
const queryRouter = require("./routes/queryRoute")
require('./database/db_connection')
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())
app.use("/api", queryRouter)
app.use("/", fulfillmentRouter)

if (process.env.NODE_ENV === 'production') {
    // js and css files
    app.use(express.static('client/build'));

    // index.html for all page routes
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`)
})