const express = require('express');
const queryRouter = express.Router()
const chatbot = require('../chatbot/chatbot.js')

queryRouter.route("/df_event_query").post(async (req, res) => {
    console.log(req)
    try {
        let result = await chatbot.eventQuery(req.body.event, req.body.userId, req.body.parameters);
        console.log(result)
        res.send(result);
    } catch (error) {
        res.send(error);
    }

})

queryRouter.route("/df_text_query").post(async (req, res) => {
    try {
        let result = await chatbot.textQuery(req.body.text, req.body.userId, req.body.parameters);
        res.send(result);
    } catch (error) {
        res.send(error);
    }

})

module.exports = queryRouter;
