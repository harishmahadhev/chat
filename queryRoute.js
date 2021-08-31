const express = require('express');
const queryRouter = express.Router()
const chatbot = require('./chatbot/chatbot.js')

queryRouter.route("/df_event_query").post(async (req, res) => {
    let result = await chatbot.eventQuery(req.body.event, req.body.parameters);
    res.send(result);
})

queryRouter.route("/df_text_query").post(async (req, res) => {
    let result = await chatbot.textQuery(req.body.text, req.body.parameters);
    res.send(result);
})

module.exports = queryRouter;
