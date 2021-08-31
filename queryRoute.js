const express = require('express');
const queryRouter = express.Router()
const chatbot = require('./chatbot/chatbot.js')

queryRouter.route("/df_event_query").post((req, res) => {
    res.send({ 'do': 'event query' })
})

queryRouter.route("/df_text_query").post(async (req, res) => {
    let result = await chatbot.textQuery(req.body.text);
    res.send(result);
})

module.exports = queryRouter;
