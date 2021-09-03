const express = require('express');
const app = express();
const cors = require('cors')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
require('./database/db_connection')
require('./routes/dialogFlowRoutes.js')(app)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log("Server Started at PORT")
})