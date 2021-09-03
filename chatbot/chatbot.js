'use strict'
const config = require('../config/keys')
const dialogflow = require('dialogflow')
const structjson = require('./structJson')
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey,
}
const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

module.exports = {
    textQuery: async function (text, userId, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId)
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        const result = responses[0].queryResult;
        return result;
    },

    eventQuery: async function (event, userId, parameters = {}) {
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userId)
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    // The language used by the client (en-US)
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses)
        const result = responses[0].queryResult;
        return result;
    },
    handleAction: (responses) => responses
}