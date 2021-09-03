const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())
require('./routes/dialogFlowRoutes.js')(app)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server Started at PORT")
})