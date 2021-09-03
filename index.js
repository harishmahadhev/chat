const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
require('./database/db_connection')
require('./routes/dialogFlowRoutes.js')(app)
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`)
})